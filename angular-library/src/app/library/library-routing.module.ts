import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
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
        path: 'create-book',
        pathMatch: 'full',
        component: CreateBookComponent,
        canActivate: [AuthActivate]
      },
      { path: ':bookId', component: CurrentBookComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
