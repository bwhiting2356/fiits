import { NavState } from './nav.state';
import { navInitialState } from './nav.initialState';

import * as nav from './nav.actions';


export function navReducer(state = navInitialState, action: nav.Actions): NavState {
  switch (action.type) {
    case nav.SHOW_NAV:
      return {...state, showNav: true};

    case nav.CLOSE_NAV:
      return {...state, showNav: false};

    default:
      return state;
  }
}
