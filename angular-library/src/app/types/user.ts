
export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  created_at: string;
  updatedAt: string;
  createdBooks: string[];
  likedBooks: string[];
  __v: number;
}

export interface UserForAuth {
  _id: string;
  username: string;
  email: string;
  password?: string;
  accessToken: string;
}

export interface ProfileDetails {
  _id?: string;
  username: string;
  email: string;
}
