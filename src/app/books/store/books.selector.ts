import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from './books';
export const selectBooks = createFeatureSelector<Book[]>('mybooks');
export const selectBookById = (bookId: number) =>
  createSelector(selectBooks, (books: Book[]) => {
    var bookbyId = books.filter((_) => _.id == bookId);
    if (bookbyId.length == 0) {
      return null;
    }
    return bookbyId[0];
  });
