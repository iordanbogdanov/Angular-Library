import { Component, Injectable, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book, BookDetails } from 'src/app/types/book';
import { UserService } from 'src/app/user/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css'],
})
@Injectable({ providedIn: 'root' })
export class CurrentBookComponent implements OnInit {
  book = {} as Book;
  showEditMode: boolean = false;

  bookDetails: BookDetails = {
    bookName: '',
    authorName: '',
    bookDescription: '',
    bookImage: '',
  };

  form = this.fb.group({
    bookName: ['', [Validators.required, Validators.minLength(2)]],
    authorName: ['', [Validators.required, Validators.minLength(2)]],
    bookImage: ['', [Validators.required, Validators.minLength(10)]],
    bookDescription: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['bookId'];

      this.apiService.getBook(id).subscribe((book) => {
        this.book = book;
        console.log(book);
        let bookName = this.book.bookName;
        let bookDescription = this.book.bookDescription;
        let bookImage = this.book.bookImage;
        let authorName = this.book.authorName;

        this.bookDetails = {
          bookName,
          authorName,
          bookDescription,
          bookImage,
        };

        this.form.setValue({
          bookName,
          authorName,
          bookDescription,
          bookImage,
        });
      });
      return data;
    });
  }

  onToggle(): void {
    this.showEditMode = !this.showEditMode;

  }

  saveBookHandle(): void {
    if (this.form.invalid) {
      return;
    }
    this.bookDetails = this.form.value as BookDetails;
    const { bookName, authorName, bookDescription, bookImage } =
      this.bookDetails;

    this.apiService
      .updateBook(bookName, authorName, bookDescription, bookImage, this.book._id)
      .subscribe(() => {
        this.onToggle();
        this.router.navigate(['/library']);
      });
  }

  onCancel(e: Event) {
    e.preventDefault();
    this.onToggle();
  }

  deleteBook(): void {
    this.apiService.deleteBook(this.book._id).subscribe(() => {
      this.router.navigate(['/library']);
    });
  }
}
