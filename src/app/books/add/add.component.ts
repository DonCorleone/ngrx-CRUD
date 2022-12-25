import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Book } from '../store/books';

import { invokeSaveNewBookAPI } from '../store/books.action';
import { Router } from '@angular/router';
import { Appstate } from 'src/app/shared/store/appstate';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}
  bookForm: Book = {
    id: 0,
    author: '',
    name: '',
    cost: 0,
  };

  save() {
    this.store.dispatch(invokeSaveNewBookAPI({ newBook: this.bookForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
