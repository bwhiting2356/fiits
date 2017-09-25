import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../environments/constants';
import { UserCredentials } from './store/userCredentials';
import {LogInError, LogInSuccess, LogInTry, LogOut, SignUpError, SignUpSuccess, SignUpTry} from './store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';

interface TokenResponse {
  token: string
}
@Injectable()
export class AuthService {

  signUpTry(userCredentials: UserCredentials) {
    this.store.dispatch(new SignUpTry(userCredentials));
  }

  signUpSuccess(token: string) {
    this.store.dispatch(new SignUpSuccess(token));
  }

  signUpError(err: string) {
    this.store.dispatch(new SignUpError(err));
  }

  logInTry(userCredentials: UserCredentials) {
    this.store.dispatch(new LogInTry(userCredentials));
  }

  logInSuccess(token: string) {
    this.store.dispatch(new LogInSuccess(token));
  }

  logInError(err: string) {
    this.store.dispatch(new LogInError(err));
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }

  constructor(private store: Store<AppState>) {}

}
