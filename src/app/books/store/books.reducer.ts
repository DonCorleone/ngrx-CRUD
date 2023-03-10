import { createReducer, on } from '@ngrx/store';
import { Book } from '../store/books';
import {
  booksFetchAPISuccess,
  saveNewBookAPISucess,
  updateBookAPISucess,
} from './books.action';
export const initialState: ReadonlyArray<Book> = [];
export const bookReducer = createReducer(
  initialState,
  // first, the param is the existing store state, and the second param is the action(eg: boooksFetchAPISuccess) payload(API payload)
  on(booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(saveNewBookAPISucess, (state, { newBook }) => {
    let newState = [...state];
    newState.unshift(newBook);
    return newState;
  }),
  on(updateBookAPISucess, (state, { updateBook }) => {
    let newState = state.filter((_) => _.id != updateBook.id);
    newState.unshift(updateBook);
    return newState;
  })
);
