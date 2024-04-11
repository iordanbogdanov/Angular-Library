import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  createBook(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { bookName, authorName, bookDescription, bookImage } = form.value;

    this.apiService
      .createBook(bookName, authorName, bookDescription, bookImage)
      .subscribe(() => {
          this.router.navigate(['/library/']);
      });
  }
}
