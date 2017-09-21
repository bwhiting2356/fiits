import { SearchState } from './search.state';
import { searchInitialState } from './search.initialState';

import * as search from './search.actions';

export function searchReducer(state = searchInitialState, action: search.Actions): SearchState {
  switch (action.type) {
    case search.ORIGIN_ADDRESS_CHANGE:
      return {...state, origin: { ...state.origin, address: action.payload }};

    case search.ORIGIN_COORDS_CHANGE:
      return {...state, origin: { ...state.origin, coords: action.payload }};

    case search.ORIGIN_FOCUS:
      return {...state, origin: {...state.origin, focus: true }, destination: { ...state.destination, focus: false }};

    case search.ORIGIN_START_FETCH:
      return {...state, origin: {...state.origin, fetching: true }};

    case search.ORIGIN_STOP_FETCH:
      return {...state, origin: {...state.origin, fetching: false }};

    case search.DESTINATION_ADDRESS_CHANGE:
      return {...state, destination: { ...state.destination, address: action.payload }};

    case search.DESTINATION_COORDS_CHANGE:
      return {...state, destination: { ...state.destination, coords: action.payload }};

    case search.DESTINATION_FOCUS:
      return {...state, destination: {...state.destination, focus: true }, origin: { ...state.origin, focus: false }};

    case search.NO_FOCUS:
      return {...state, destination: {...state.destination, focus: false }, origin: {...state.origin, focus: false }}

    case search.CHANGE_TIME_TARGET:
      return {...state, time: {...state.time, timeTarget: action.payload }}

    case search.CHANGE_TIME:
      return {...state, time: {...state.time, time: action.payload }}

    case search.MAP_START_RENDERING:
      return {...state, map: { ...state.map, rendering: true }};

    case search.MAP_STOP_RENDERING:
      return {...state, map: { ...state.map, rendering: false }};

    case search.MAP_SET_CENTER:
      return {...state, map: {...state.map, center: action.payload }};

    case search.MAP_SET_ZOOMLEVEL:
      return {...state, map: {...state.map, zoomLevel: action.payload }};

    default:
      return state;
  }
}
