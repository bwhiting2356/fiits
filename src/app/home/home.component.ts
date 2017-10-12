import { Component, } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {ClearFlashMessage} from './store/search.actions';

@Component({
  selector: 'app-home',
  template: `
    <app-menu-icon></app-menu-icon>
    <!--<app-flash-message></app-flash-message>-->
    <app-search-container></app-search-container>
    <app-map-container></app-map-container>
  `,
  styles: [``]
})
export class HomeComponent {
  error: Observable<string>;
  flashMessage: Observable<string>;
  messageClass: Observable<string>;
  constructor(
    private store: Store<AppState>
  ) {
    this.error = this.store.select('search').map(search => search.result.error);
    this.flashMessage = this.store.select('search').map(search => search.flash.message);
    this.messageClass = this.store.select('search').map(search => search.flash.clazz);
  }

  clearFlashMessage() {
    this.store.dispatch(new ClearFlashMessage())
  }

}

