import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksService } from '../books.service';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import {
  invokeBooksAPI,
  booksFetchAPISuccess,
  invokeSaveNewBookAPI,
  saveNewBookAPISucess,
} from './books.action';
import { selectBooks } from './books.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';

@Injectable()
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}
  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      // It takes action(eg: invokeBooksAPI) as input parameter. It allows the execution-only the action that registered with got invoked.
      ofType(invokeBooksAPI),
      // It outputs the latest result of an observable. Here 'this.store.pipe(select(selectBooks))' trying to fetch the data from the store if already exist.
      withLatestFrom(this.store.pipe(select(selectBooks))),
      //  The first input parameter is undefined because 'ofType' observable has a void action method and the second input parameter comes from the 'withLatestFrom'.
      mergeMap(([, bookfromStore]) => {
        // If the data already exists in the ngrx store, then return 'EMTY' observable.
        if (bookfromStore.length > 0) {
          return EMPTY;
        }
        // If the data do not already exist, thin invoke the API call, on receiving a successful response save it store by calling the 'bookFetchAPISuccess'(action).
        return this.booksService
          .get()
          .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.create(action.newBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewBookAPISucess({ newBook: data });
          })
        );
      })
    );
  });
}
