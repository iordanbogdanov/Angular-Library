import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from 'src/app/user/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  authors: Book[] | null = [];
  uniqueArr: string[] | null = [];

  constructor(private api: ApiService, private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?._id || '';
  }

  ngOnInit(): void {
    this.api.getAuthors().subscribe((authors) => {
      let objToArr = Object.entries(authors).map(
        (authors: any) => authors[1].authorName
      );
      this.uniqueArr = Array.from(new Set(objToArr.map((item) => item))).sort(
        (a: any, b: any) => a.toLowerCase().localeCompare(b.toLowerCase())
      );
      return this.uniqueArr;
    });
  }
}
