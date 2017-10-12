import { Action } from '@ngrx/store';
import { UserCredentials } from './userCredentials';

export const SIGN_UP_TRY = 'SIGN_UP_TRY';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const LOG_IN_TRY = 'LOG_IN_TRY';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT = 'LOG_OUT';

// export const SHOW_LOG_IN = 'SHOW_LOG_IN';
// export const HIDE_LOG_IN = 'HIDE_LOG_IN';
// export const SHOW_SIGN_UP = 'SHOW_SIGN_UP';
// export const HIDE_SIGN_UP = 'HIDE_SIGN_UP';
// export const SHOW_AUTH = 'SHOW_AUTH';
// export const HIDE_AUTH = 'HIDE_AUTH';

export const EMAIL_CHANGE = 'EMAIL_CHANGE';
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE';

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

// export class ShowLogIn implements Action {
//   readonly type = SHOW_LOG_IN;
// }
//
// export class HideLogIn implements Action {
//   readonly type = HIDE_LOG_IN;
// }
//
// export class ShowSignUp implements Action {
//   readonly type = SHOW_SIGN_UP;
// }
//
// export class HideSignUp implements Action {
//   readonly type = HIDE_SIGN_UP;
// }
//
// export class ShowAuth implements Action {
//   readonly type = SHOW_AUTH;
// }
//
// export class HideAuth implements Action {
//   readonly type = HIDE_AUTH;
// }

export class EmailChange implements Action {
  readonly type = EMAIL_CHANGE;

  constructor(public payload: string) {}
}

export class PasswordChange implements Action {
  readonly type = PASSWORD_CHANGE;

  constructor(public payload: string) {}
}

export type Actions
  = SignUpTry
  | SignUpSuccess
  | SignUpError
  | LogInTry
  | LogInSuccess
  | LogInError
  | LogOut
  // | ShowLogIn
  // | HideLogIn
  // | ShowSignUp
  // | HideSignUp
  // | ShowAuth
  // | HideAuth
  | EmailChange
  | PasswordChange;
