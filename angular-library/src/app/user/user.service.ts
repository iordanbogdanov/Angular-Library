import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();

    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  private loadUserFromLocalStorage(): void {
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    const _id = localStorage.getItem('userId');

    if (accessToken && email && username && _id) {
      this.user$$.next({ email, username, _id, accessToken });
    } else {
      this.user$$.next(undefined);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${environment.apiUrl}/users/login`, {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          localStorage.setItem('accessToken', user.accessToken);
          localStorage.setItem('email', user.email);
          localStorage.setItem('username', user.username);
          localStorage.setItem('userId', user._id);

          this.user$$.next({
            email: user.email,
            username: user.username,
            _id: user._id,
            accessToken: user.accessToken,
          });
        })
      );
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>(`${environment.apiUrl}/users/register`, {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(
        tap((user) => {
          localStorage.setItem('accessToken', user.accessToken);

          localStorage.setItem('email', user.email);
          localStorage.setItem('username', user.username);
          localStorage.setItem('userId', user._id);
          this.user$$.next({
            email: user.email,
            username: user.username,
            _id: user._id,
            accessToken: user.accessToken,
          });
        })
      );
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/users/logout`, {}).pipe(
      tap((res) => {
        localStorage.clear();
        this.user$$.next(undefined);
      })
    );
  }

  getProfile() {
    return this.http.get<UserForAuth>(`${environment.apiUrl}/users/me`).pipe(
      tap((user) => {
        this.user$$.next(user);
      })
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
