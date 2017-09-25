import { AuthState } from './auth.state';

export const authInitialState: AuthState = {
  token: '',
  fetching: false,
  error: '',
  showAuth: false,
  showLogin: false,
  showSignup: false
};
