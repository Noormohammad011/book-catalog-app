interface ErrorMessage {
  path: string;
  message: string;
}
export interface GenericResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages?: ErrorMessage[];
  data: T;
}

//I want to accsessToken using GenericResponse using extends
export interface IAuthResponse
  extends GenericResponse<{
    accessToken: string;
  }> {}

export interface IUserResponse extends GenericResponse<IUser> {}

export interface IUser {
  name: string;
  email: string;
  password: string;
  wishlist?: Array<{ bookID: string }>;
  readingList?: Array<{
    book: string;
    status: string;
  }>;
  confirmPassword?: string;
}

export interface ILogin {
  email: string;
  password: string;
}


export interface IBook {
  _id?: string;
  image?: string;
  author?: string;
  title: string;
  genre: string;
  publicationDate: Date | null;
}

export interface IBookComment {
  bookId?: string;
  comment: string;
}

export interface IBookCommentResponse extends GenericResponse<IBookComment> {}

export interface IBookResponse extends GenericResponse<IBook> {}
