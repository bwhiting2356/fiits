import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';

@Component({
  selector: 'app-auth-container',
  template: `
    <app-auth-header></app-auth-header>
    <app-search-loader *ngIf="fetching | async"
      [message]="'Authenticating...'">
    </app-search-loader>
  `,
  styleUrls: ['./auth-container.component.css']
})
export class AuthContainerComponent implements OnInit {
  // showLogin: Observable<boolean>;
  // showSignup: Observable<boolean>;
  fetching: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.showLogin = this.store.select('auth').map(auth => auth.showLogin);
    // this.showSignup = this.store.select('auth').map(auth => auth.showSignup);
    this.fetching = this.store.select('auth').map(auth => auth.fetching);
  }

}
