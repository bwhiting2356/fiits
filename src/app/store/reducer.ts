
import { combineReducers} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core';

import { searchInitialState } from '../home/store/search.initialState';
import { SearchState } from '../home/store/search.state';
import { searchReducer } from '../home/store/search.reducers';

import { AuthState } from '../auth/store/auth.state';
import { authInitialState } from '../auth/store/auth.initialState';
import { authReducer } from '../auth/store/auth.reducers';

import { NavState } from '../navigation/store/nav.state';
import { navInitialState } from '../navigation/store/nav.initialState';
import { navReducer } from '../navigation/store/nav.reducers';
import { RouterState } from '@angular/router';
import { routerReducer } from '@ngrx/router-store';


export interface AppState {
  router: RouterState
  search: SearchState,
  auth: AuthState,
  nav: NavState
}

export const initialState = {
  router: {
    path: '/'
  },
  search: searchInitialState,
  auth: authInitialState,
  nav: navInitialState
};

// TODO: I'm not doing these imports properly but somehow it's working

const reducers = {
  search: searchReducer,
  auth: authReducer,
  nav: navReducer,
  router: routerReducer
};

export function reducer(state: any, action: any) {
  return compose(storeFreeze, combineReducers)(reducers);
}
