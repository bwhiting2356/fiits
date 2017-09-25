import { SearchState } from '../reservation-search/store/search.state';
import { searchReducer } from '../reservation-search/store/search.reducers';
import { combineReducers} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core';
import { searchInitialState } from '../reservation-search/store/search.initialState';
import { AuthState } from '../auth/store/auth.state';
import { authInitialState } from '../auth/store/auth.initialState';
import { authReducer } from '../auth/store/auth.reducers';
import {NavState} from "../navigation/store/nav.state";
import {navInitialState} from "../navigation/store/nav.initialState";
import {navReducer} from "../navigation/store/nav.reducers";

export interface AppState {
  search: SearchState,
  auth: AuthState,
  nav: NavState
}

export const initialState = {
  search: searchInitialState,
  auth: authInitialState,
  nav: navInitialState
};

const reducers = {
  search: searchReducer,
  auth: authReducer,
  nav: navReducer
};

export function reducer(state: any, action: any) {
  return compose(storeFreeze, combineReducers)(reducers);
}
