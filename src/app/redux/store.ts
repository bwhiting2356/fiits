import { tassign } from 'tassign';
import {} from 'googlemaps';

import { Coords } from '../shared/coords.model';
import { Place } from '../shared/place.model';
import { TimeTarget } from '../shared/timetarget.model';
import { MapMarker } from '../shared/mapmarker.model';
import { MapMarkerType } from '../shared/mapmarkertype.model';
import { TripQueryResponse } from '../shared/tripqueryresponse.model';

import { Reducer } from 'redux';

import {
  SEARCH_ORIGIN_CHANGE,
  SEARCH_ORIGIN_CLEAR,
  SEARCH_ORIGIN_SHOW_X,
  SEARCH_ORIGIN_HIDE_X,
  SEARCH_DESTINATION_CHANGE,
  SEARCH_DESTINATION_CLEAR,
  SEARCH_DESTINATION_SHOW_X,
  SEARCH_DESTINATION_HIDE_X,
  SEARCH_ADD_DAY,
  SEARCH_SUBTRACT_DAY,
  SEARCH_ADD_TEN_MINUTES,
  SEARCH_SUBTRACT_TEN_MINUTES,
  SEARCH_CHANGE_TIMETARGET,
  SEARCH_SET_TIME_TO_NOW,
  MAP_REDO_FITBOUNDS,
  SEARCH_FETCH_RESULT,
  SEARCH_CANCEL_FETCH,
  SEARCH_RESULT_RECEIVED
} from './actions';




export interface IAppState {
  searchOrigin: Place;
  searchOriginXShowing: boolean;
  searchDestination: Place;
  searchDestinationXShowing: boolean;
  searchResponse?: any;
  searchTimeTarget: String;
  searchDatetime: Date;
  searchFetching: boolean;
  searchResult: TripQueryResponse;
  mapBounds: google.maps.LatLngBounds;
}

interface Action {
  type: String,
  body: any
}

export const INITIAL_STATE: IAppState = {
  searchOrigin: undefined,
  searchOriginXShowing: false,
  searchDestination: undefined,
  searchDestinationXShowing: false,
  searchTimeTarget: TimeTarget.LEAVE_NOW,
  searchDatetime: new Date(),
  searchFetching: false,
  searchResult: undefined,
  mapBounds: undefined,
};

const searchOriginChange: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  const newOrigin: Place = action.body;
  return tassign(state, { searchOrigin: newOrigin });
};

const searchOriginClear: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  const newOrigin: Place = undefined;
  return tassign(state, { searchOrigin: newOrigin });
};

const searchOriginShowX: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchOriginXShowing: true });
};

const searchOriginHideX: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchOriginXShowing: false });
};

const searchDestinationChange: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDestination: action.body });
};

const searchDestinationClear: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  const newDestination: Place = undefined;
  return tassign(state, { searchDestination: newDestination });
};

const searchDestinationShowX: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDestinationXShowing: true });
};

const searchDestinationHideX: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDestinationXShowing: false });
};

const mapRedoFitBounds: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  const newBounds = new google.maps.LatLngBounds();
  if (state.searchOrigin) {
    newBounds.extend(state.searchOrigin.coords);
  }
  if (state.searchDestination) {
    newBounds.extend(state.searchDestination.coords);
  }
  if (state.searchResult) {
    newBounds.extend(state.searchResult.station1Location);
    newBounds.extend(state.searchResult.station2Location);
  }
  return tassign(state, { mapBounds: newBounds});
};

const DAY = 86400000;
const TEN_MINUTES = 1000 * 60 * 10;

const searchAddDay = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDatetime: new Date(state.searchDatetime.getTime() + DAY)});
};

const searchSubtractDay: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDatetime: new Date(state.searchDatetime.getTime() - DAY)});
};

const searchAddTenMinutes: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDatetime: new Date(state.searchDatetime.getTime() + TEN_MINUTES)});
};

const searchSubtractTenMinutes: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDatetime: new Date(state.searchDatetime.getTime() - TEN_MINUTES)});
};

const searchChangeTimeTarget: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchTimeTarget: action.body });
};

const searchSetTimeToNow: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDatetime: new Date() });
};

const searchFetchResult: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchFetching: true})
};

const searchCancelFetch: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchFetching: false})
};

const searchResultReceived: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchFetching: false, searchResult: action.body})
};

export function rootReducer(state: IAppState, action: Action): IAppState {
  switch (action.type) {
    case SEARCH_ORIGIN_CHANGE: return searchOriginChange(state, action);
    case SEARCH_ORIGIN_CLEAR: return searchOriginClear(state, action);
    case SEARCH_ORIGIN_SHOW_X: return searchOriginShowX(state, action);
    case SEARCH_ORIGIN_HIDE_X: return searchOriginHideX(state, action);

    case SEARCH_DESTINATION_CHANGE: return searchDestinationChange(state, action);
    case SEARCH_DESTINATION_CLEAR: return searchDestinationClear(state, action);
    case SEARCH_DESTINATION_SHOW_X: return searchDestinationShowX(state, action);
    case SEARCH_DESTINATION_HIDE_X: return searchDestinationHideX(state, action);

    case SEARCH_ADD_DAY: return searchAddDay(state, action);
    case SEARCH_SUBTRACT_DAY: return searchSubtractDay(state, action);
    case SEARCH_ADD_TEN_MINUTES: return searchAddTenMinutes(state, action);
    case SEARCH_SUBTRACT_TEN_MINUTES: return searchSubtractTenMinutes(state, action);

    case SEARCH_CHANGE_TIMETARGET: return searchChangeTimeTarget(state, action);
    case SEARCH_SET_TIME_TO_NOW: return searchSetTimeToNow(state, action);
    case MAP_REDO_FITBOUNDS: return mapRedoFitBounds(state, action);

    case SEARCH_FETCH_RESULT: return searchFetchResult(state, action);
    case SEARCH_CANCEL_FETCH: return searchCancelFetch(state, action);

    case SEARCH_RESULT_RECEIVED: return searchResultReceived(state, action);
  }
  return state;
}
