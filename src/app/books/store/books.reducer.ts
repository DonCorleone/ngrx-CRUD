import { createReducer, on } from '@ngrx/store';
import { Books } from '../store/books';
import { booksFetchAPISuccess } from './books.action';
export const initialState: ReadonlyArray<Books> = [];
export const bookReducer = createReducer(
  initialState,
  // first, the param is the existing store state, and the second param is the action(eg: boooksFetchAPISuccess) payload(API payload)
  on(booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  })
);
