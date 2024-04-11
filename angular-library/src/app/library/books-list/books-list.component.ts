import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from 'src/app/user/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: Book[] | null = [];

  constructor(private api: ApiService, private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?._id || '';
  }

  ngOnInit(): void {
    this.api.getBooks().subscribe((books) => {
      const sortDatesCB = (
        a: { _createdOn: string },
        b: { _createdOn: string }
      ) => (new Date(b._createdOn) as any) - (new Date(a._createdOn) as any);
      const tempBooks = books.sort(sortDatesCB as any);

      this.books = tempBooks;
    });
  }

  showDetails(bookId: string) {
    this.api.getBook(bookId).subscribe((book) => {});
  }
}
