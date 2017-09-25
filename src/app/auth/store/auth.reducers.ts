import { authInitialState } from './auth.initialState';
import { AuthState } from './auth.state';

import * as auth from './auth.actions';
import {LOG_IN_ERROR, LOG_IN_SUCCESS, LOG_OUT, SIGN_UP_ERROR, SIGN_UP_SUCCESS} from './auth.actions';

export function authReducer(state = authInitialState, action: auth.Actions): AuthState {
  switch (action.type) {
    case auth.SIGN_UP_TRY:
    case auth.LOG_IN_TRY:
      return { fetching: true, token: '', error: '' };

    case SIGN_UP_SUCCESS:
    case LOG_IN_SUCCESS:
      return { fetching: false, token: action.payload, error: '' };

    case SIGN_UP_ERROR:
    case LOG_IN_ERROR:
      return { fetching: false, token: '', error: action.payload };

    case LOG_OUT:
      return { fetching: false, token: '', error: '' };

    default:
      return state;
  }
}
