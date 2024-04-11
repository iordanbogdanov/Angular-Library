import { User } from './user';

export interface Book {
  _ownerId?: User;
  bookName: string;
  authorName: string;
  bookDescription: string;
  bookImage: string;
  _createdOn?: string;
  _id: string;
}

export interface BookDetails {
  bookName: string;
  authorName: string;
  bookDescription: string;
  bookImage: string;
  _id?: string;
}