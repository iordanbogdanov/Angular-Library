import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { CurrentBookComponent } from './current-book/current-book.component';
import { AuthActivate } from '../guards/auth.activate';
import { AuthorsComponent } from './authors/authors.component';

const routes: Routes = [
  {
    path: 'library',
    children: [
      { path: '', pathMatch: 'full', component: BooksListComponent },
      { path: 'authors', component: AuthorsComponent },
      {
      { path: ':bookId', component: CurrentBookComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
