export interface AuthState {
  token: string,
  fetching: boolean;
  showAuth: boolean;
  showLogin: boolean;
  showSignup: boolean;
  email: string,
  password: string
}