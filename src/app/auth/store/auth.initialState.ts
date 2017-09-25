import { AuthState } from './auth.state';

export const authInitialState: AuthState = {
  token: '',
  fetching: false,
  error: ''
}
