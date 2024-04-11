import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ErrorService } from './core/error/error.service';
import { Router } from '@angular/router';

const { apiUrl } = environment;

@Injectable()
class AppInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (req.url.startsWith(apiUrl) && accessToken) {
      req = req.clone({
        setHeaders: {
          "X-Authorization": accessToken
        }
      });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/users/login']);
          console.log(err);
        } else {
          this.errorService.setError(err);
          this.router.navigate(['/error']);
        }

        return [err];
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};
