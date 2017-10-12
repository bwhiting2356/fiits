
import { ActionReducerMap } from '@ngrx/store';

import { searchInitialState } from '../home/store/search.initialState';
import { SearchState } from '../home/store/search.state';
import { searchReducer } from '../home/store/search.reducers';

import { AuthState } from '../services/auth/store/auth.state';
import { authInitialState } from '../services/auth/store/auth.initialState';
import { authReducer } from '../services/auth/store/auth.reducers';

import { NavState } from '../navigation/store/nav.state';
import { navInitialState } from '../navigation/store/nav.initialState';
import { navReducer } from '../navigation/store/nav.reducers';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  // router: RouterReducerState<any>
  search: SearchState,
  auth: AuthState,
  nav: NavState
}

export const initialState = {
  // router: {
  //   path: '/'
  // },
  search: searchInitialState,
  auth: authInitialState,
  nav: navInitialState
};

export const reducers: ActionReducerMap<AppState> = {
  // router: routerReducer,
  search: searchReducer,
  auth: authReducer,
  nav: navReducer
};

// TODO: wny is the router state crashing the devtools?
