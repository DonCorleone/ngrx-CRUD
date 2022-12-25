import { createFeatureSelector } from '@ngrx/store';
import { Book } from './books';
export const selectBooks = createFeatureSelector<Book[]>('mybooks');
