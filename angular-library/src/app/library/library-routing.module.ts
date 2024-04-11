import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
  {
    path: 'library',
    children: [
      { path: '', pathMatch: 'full', component: BooksListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
