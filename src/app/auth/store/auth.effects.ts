import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { SearchService } from '../../services/search.service';
import { Action } from '@ngrx/store';

import * as auth from './auth.actions'

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../../environments/constants';
import { LogInTry, SignUpTry } from './auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false}) login$ = this.actions$
    .ofType(auth.LOG_IN_TRY)
    .switchMap((action: LogInTry) => {
      return this.http.post(BASE_URL + 'auth/login', action.payload)
    })
    .map((res: HttpResponse<any>) => {
      if (res['token']) {
        this.authService.logInSuccess(res['token']);
      } else if (res['error']) {
        this.authService.logInError(res['error']);
      } else {
        console.log('No error or token, what\'s going on?');
      }
    });

  @Effect({dispatch: false}) signup$ = this.actions$
    .ofType(auth.SIGN_UP_TRY)
    .switchMap((action: SignUpTry) => {
      return this.http.post(BASE_URL + 'auth/signup', action.payload)
    })
    .map((res: HttpResponse<any>) => {
      if (res['token']) {
        this.authService.signUpSuccess(res['token']);
      } else if (res['error']) {
        this.authService.signUpError(res['error']);
      } else {
        console.log('No error or token, what\'s going on?');
      }
    });

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private authService: AuthService
  ) { }
}
