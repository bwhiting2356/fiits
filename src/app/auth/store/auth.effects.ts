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
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false}) login$ = this.actions$
    .ofType(auth.LOG_IN_TRY)
    .switchMap((action: LogInTry) => {
      return this.http.post(BASE_URL + 'auth/login', action.payload)
    })
    .map((res: HttpResponse<any>) => {
      this.authService.logInSuccess(res['token']);
    })
    .catch(err => {
      this.authService.logInError(err['error']);
      return err;
    });

  @Effect({dispatch: false}) signup$ = this.actions$
    .ofType(auth.SIGN_UP_TRY)
    .switchMap((action: SignUpTry) => {
      return this.http.post(BASE_URL + 'auth/signup', action.payload)
    })
    .map((res: HttpResponse<any>) => {
      this.authService.signUpSuccess(res['token']);
    })
    .catch(err => of(new auth.SignUpError(err['error'])));

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private authService: AuthService
  ) { }
}
