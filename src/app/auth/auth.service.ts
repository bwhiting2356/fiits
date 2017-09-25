import { Injectable } from '@angular/core';
import { UserCredentials } from './store/userCredentials';
import {
  HideAuth, HideLogIn, HideSignUp, LogInError, LogInSuccess, LogInTry, LogOut, ShowAuth, ShowLogIn, ShowSignUp,
  SignUpError,
  SignUpSuccess,
  SignUpTry
} from './store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import {ShowFlashMessage} from "../home/store/search.actions";

@Injectable()
export class AuthService {

  signUpTry(userCredentials: UserCredentials) {
    this.store.dispatch(new SignUpTry(userCredentials));
    this.store.dispatch(new HideSignUp());
  }

  signUpSuccess(token: string) {
    this.store.dispatch(new SignUpSuccess(token));
    this.store.dispatch(new HideAuth());
    this.store.dispatch(new ShowFlashMessage({ message: 'Sign up successful', clazz: 'alert-success'}))
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

  showLogIn() {
    this.store.dispatch(new ShowAuth());
    this.store.dispatch(new ShowLogIn());
  }

  hideLogIn() {
    this.store.dispatch(new HideLogIn());
  }

  showSignUp() {
    this.store.dispatch(new ShowAuth());
    this.store.dispatch(new ShowSignUp());
  }

  hideSignUp() {
    this.store.dispatch(new HideSignUp());
  }

  hideAuth() {
    this.store.dispatch(new HideAuth());
  }

  constructor(private store: Store<AppState>) {}

}
