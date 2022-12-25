import { createAction, props } from '@ngrx/store';
import { Books } from './books';

// this action going to invoke the API call.
export const invokeBooksAPI = createAction(
  '[Books API] Invoke Books Fetch API'
);

// this action method invoked after the API
export const booksFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allBooks: Books[] }>()
);
