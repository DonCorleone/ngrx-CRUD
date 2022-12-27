import { createAction, props } from '@ngrx/store';
import { Book as Book } from './books';

// this action going to invoke the API call.
export const invokeBooksAPI = createAction(
  '[Books API] Invoke Books Fetch API'
);
// this action method invoked after the API
export const booksFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allBooks: Book[] }>()
);
export const invokeSaveNewBookAPI = createAction(
  '[Books API] Inovke save new book api',
  props<{ newBook: Book }>()
);
export const saveNewBookAPISucess = createAction(
  '[Books API] save new book api success',
  props<{ newBook: Book }>()
);
export const invokeUpdateBookAPI = createAction(
  '[Books API] Inovke update book api',
  props<{ updateBook: Book }>()
);
export const updateBookAPISucess = createAction(
  '[Books API] update  book api success',
  props<{ updateBook: Book }>()
);
