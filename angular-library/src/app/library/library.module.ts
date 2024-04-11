import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookComponent } from './create-book/create-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { LibraryRoutingModule } from './library-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateBookComponent, BooksListComponent],
  imports: [CommonModule, LibraryRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
  providers: []
})
export class LibraryModule {}
