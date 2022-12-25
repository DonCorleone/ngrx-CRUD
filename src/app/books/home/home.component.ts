import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeBooksAPI } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  // observable that listens for the changes from the store. Here we use 'selectBooks' selector to fetch all the data from the store.
  books$ = this.store.pipe(select(selectBooks));
  ngOnInit(): void {
    // invoking the 'invokeBooksAPI' action method which will invoke ngrx effect that invokes an API call.
    this.store.dispatch(invokeBooksAPI());
  }
}
