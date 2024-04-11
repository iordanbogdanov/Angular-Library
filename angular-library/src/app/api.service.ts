import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Book } from './types/book';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private book$$ = new BehaviorSubject<Book | undefined>(undefined);
  private book$ = this.book$$.asObservable();

  book: Book | undefined;

  constructor(private http: HttpClient) {}

  //BOOKS
  getBooks() {
    const { apiUrl } = environment;
    return this.http.get<Book[]>(`${apiUrl}/data/library`);
  }

  getBook(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Book>(`${apiUrl}/data/library/${id}`);
  }

  createBook(
    bookName: string,
    authorName: string,
    bookDescription: string,
    bookImage: string
  ) {
    const { apiUrl } = environment;
    return this.http.post<Book>(`${apiUrl}/data/library`, {
      bookName,
      authorName,
      bookDescription,
      bookImage,
    });
  }

  updateBook(
    bookName: string,
    authorName: string,
    bookDescription: string,
    bookImage: string,
    id: string
  ) {
    
    return this.http
      .put<Book>(`${environment.apiUrl}/data/library/${id}`, {
        bookName,
        authorName,
        bookDescription,
        bookImage,
      })
      .pipe(tap((book) => this.book$$.next(book)));
  }

  deleteBook(bookId: string) {
    return this.http.delete<Book>(
      `${environment.apiUrl}/data/library/${bookId}`
    );
  }

  // AUTHORS
  getAuthors() {
    return this.http.get<Book>(`${environment.apiUrl}/data/library`);
  }
}
