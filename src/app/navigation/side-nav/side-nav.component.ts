import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { CloseNav } from '../store/nav.actions';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('slide', [
      state('show', style({
        marginLeft: '0px'
      })),
      state('hide', style({
        marginLeft: '-250px'
      })),
      transition('* => *', [
        animate('300ms ease-in')
      ]),
    ])
  ]
})
export class SideNavComponent {
  authenticated: Observable<boolean>;
  showNav: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.authenticated = this.store.select('auth')
      .map(auth => {
        return !!auth.token
      });
    this.showNav = this.store.select('nav')
      .map(nav => {
        return nav.showNav ? 'show' : 'hide'
      });
  }

  closeNav() {
    this.store.dispatch(new CloseNav());
  }

  signUp() {
    this.authService.showSignUp();
    this.closeNav();
  }

  logIn() {
    this.authService.showLogIn();
    this.closeNav();
  }
}
