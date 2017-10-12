import { Injectable } from '@angular/core';
import { UserCredentials } from './auth/store/userCredentials';
import {
  EmailChange,
  HideAuth, HideLogIn, HideSignUp, LogInError, LogInSuccess, LogInTry, LogOut, PasswordChange, ShowAuth, ShowLogIn,
  ShowSignUp,
  SignUpError,
  SignUpSuccess,
  SignUpTry
} from './auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import {ShowFlashMessage} from "../home/store/search.actions";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {
  isAuthenticated(): Observable<boolean> {
    return this.store.select('auth').map(auth => !!auth.token);
  }

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
    this.store.dispatch(new ShowSignUp());
    this.store.dispatch(new ShowFlashMessage({ message: err, clazz: 'alert-danger'}))
  }

  logInTry(userCredentials: UserCredentials) {
    this.store.dispatch(new LogInTry(userCredentials));
    this.store.dispatch(new HideLogIn());
  }

  logInSuccess(token: string) {
    this.store.dispatch(new LogInSuccess(token));
    this.store.dispatch(new HideAuth());
    this.store.dispatch(new ShowFlashMessage({ message: 'Log in successful', clazz: 'alert-success'}))
  }

  logInError(err: string) {
    this.store.dispatch(new LogInError(err));
    this.store.dispatch(new ShowLogIn());
    this.store.dispatch(new ShowFlashMessage({ message: err, clazz: 'alert-danger'}))
  }

  logOut() {
    this.store.dispatch(new LogOut());
    this.store.dispatch(new ShowFlashMessage({ message: 'You are now logged out', clazz: 'alert-success'}))
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

  emailChange(email: string) {
    this.store.dispatch(new EmailChange(email));
  }

  passwordChange(password: string) {
    this.store.dispatch(new PasswordChange(password));
  }

  constructor(private store: Store<AppState>) {}

}
