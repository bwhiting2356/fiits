import { Action } from '@ngrx/store';
import { UserCredentials } from './userCredentials';

export const SIGN_UP_TRY = 'SIGN_UP_TRY';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const LOG_IN_TRY = 'LOG_IN_TRY';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT = 'LOG_OUT';

export class SignUpTry implements Action {
  readonly type = SIGN_UP_TRY;

  constructor(public payload: UserCredentials) {}
}

export class SignUpSuccess implements Action {
  readonly type = SIGN_UP_SUCCESS;

  constructor(public payload: string) {}
}

export class SignUpError implements Action {
  readonly type = SIGN_UP_ERROR;

  constructor(public payload: string) {}
}

export class LogInTry implements Action {
  readonly type = LOG_IN_TRY;

  constructor(public payload: UserCredentials) {}
}

export class LogInSuccess implements Action {
  readonly type = LOG_IN_SUCCESS;

  constructor(public payload: string) {}
}

export class LogInError implements Action {
  readonly type = LOG_IN_ERROR;

  constructor(public payload: string) {}
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export type Actions
  = SignUpTry
  | SignUpSuccess
  | SignUpError
  | LogInTry
  | LogInSuccess
  | LogInError
  | LogOut;
