import { authInitialState } from './auth.initialState';
import { AuthState } from './auth.state';

import * as auth from './auth.actions';

export function authReducer(state = authInitialState, action: auth.Actions): AuthState {
  switch (action.type) {
    case auth.SIGN_UP_TRY:
    case auth.LOG_IN_TRY:
      return { ...state, fetching: true, token: '', error: '' };

    case auth.SIGN_UP_SUCCESS:
    case auth.LOG_IN_SUCCESS:
      return { ...state, fetching: false, token: action.payload, error: '' };

    case auth.SIGN_UP_ERROR:
    case auth.LOG_IN_ERROR:
      return { ...state, fetching: false, token: '', error: action.payload };

    case auth.LOG_OUT:
      return { ...state, fetching: false, token: '', error: '' };

    case auth.SHOW_LOG_IN:
      return {...state, showLogin: true, showSignup: false };

    case auth.HIDE_LOG_IN:
      return {...state, showLogin: false };

    case auth.SHOW_SIGN_UP:
      return {...state, showLogin: false, showSignup: true };

    case auth.HIDE_SIGN_UP:
      return {...state, showSignup: false };

    case auth.SHOW_AUTH:
      return {...state, showAuth: true };

    case auth.HIDE_AUTH:
      return {...state, showAuth: false, showLogin: false, showSignup: false };

    case auth.EMAIL_CHANGE:
      return {...state, email: action.payload };

    case auth.PASSWORD_CHANGE:
      return {...state, password: action.payload };

    default:
      return state;
  }
}
