import { SearchState } from '../reservation-search/store/search.state';
import { searchReducer } from '../reservation-search/store/search.reducers';
import { ActionReducer, combineReducers} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core';
import { searchInitialState } from '../reservation-search/store/search.initialState';

export interface AppState {
  search: SearchState
}

export const initialState = {
  search: searchInitialState
};

const reducers = {
  search: searchReducer
};

export function reducer(state: any, action: any) {
  return compose(storeFreeze, combineReducers)(reducers);
}
