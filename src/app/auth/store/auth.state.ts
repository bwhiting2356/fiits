export interface AuthState {
  token: string,
  fetching: boolean;
  error: string,
  showAuth: boolean;
  showLogin: boolean;
  showSignup: boolean;
}
