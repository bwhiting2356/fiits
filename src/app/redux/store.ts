import { tassign } from 'tassign';

import { Place } from '../shared/place';
import { ProgressSteps } from '../shared/progressSteps';

import { Reducer } from 'redux';

import {
  SEARCH_ORIGIN_CHANGE,
  SEARCH_ORIGIN_CLEAR,
  SEARCH_ORIGIN_ADDRESS_TEMP_CLEAR,
  SEARCH_ORIGIN_ADDRESS_START_FETCH,
  SEARCH_ORIGIN_ADDRESS_STOP_FETCH,
  SEARCH_DESTINATION_CHANGE,
  SEARCH_DESTINATION_CLEAR,
  SEARCH_DESTINATION_ADDRESS_TEMP_CLEAR,
  SEARCH_DESTINATION_ADDRESS_START_FETCH,
  SEARCH_DESTINATION_ADDRESS_STOP_FETCH,
  SEARCH_ADD_DAY,
  SEARCH_SUBTRACT_DAY,
  SEARCH_ADD_TEN_MINUTES,
  SEARCH_SUBTRACT_TEN_MINUTES,
  SEARCH_CHANGE_TIMETARGET,
  SEARCH_SET_TIME_TO_NOW,
  SEARCH_RESULT_RECEIVED,
  MAP_RENDERING_START,
  MAP_RENDERING_STOP,
  SEARCH_SWITCH_INPUTS,
  MAP_SET_ZOOMLEVEL,
  MAP_SET_CENTER,
  SEARCH_SUBMIT,
  SEARCH_ERROR_RECEIVED,
  SEARCH_BOOK_RESERV,
  SEARCH_CONFIRM_BOOK,
  SEARCH_RESERV_BOOKED,
  SEARCH_RESERV_ERROR,
  SEARCH_BACK_ONE_STEP,
  SEARCH_RESET
} from './actions';
import { IAppState } from './IAppState';

interface Action {
  type: String,
  body: any
}

const searchOriginChange: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, {
    searchOriginAddress: action.body.address,
    searchOriginCoords: action.body.coords
  });
};

const searchOriginClear: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, {
    searchOriginAddress: '',
    searchOriginCoords: undefined
  });
};

const searchOriginShowX: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchOriginXShowing: true });
};

const searchOriginHideX: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchOriginXShowing: false });
};

const searchOriginAddressStartFetch: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchOriginAddressFetching: true });
};

const searchOriginAddressStopFetch: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchOriginAddressFetching: false });
};

const searchOriginAddressTempClear: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchOriginAddress: '' })
};

const searchDestinationChange: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, {
    searchDestinationAddress: action.body.address,
    searchDestinationCoords: action.body.coords
  });
};

const searchDestinationClear: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  const newDestination: Place = undefined;
  return tassign(state, {
    searchDestinationAddress: '',
    searchDestinationCoords: undefined,
  });
};

const searchDestinationAddressStartFetch: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDestinationAddressFetching: true });
};

const searchDestinationAddressStopFetch: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, {searchDestinationAddressFetching: false});
};

const mapRenderingStart: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { mapRendering: true });
};

const mapRenderingStop: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { mapRendering: false });
};

const searchDestinationAddressTempClear: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchDestinationAddress: '' })
};

const searchSwitchInputs: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, {
    searchOriginAddress: state.searchDestinationAddress,
    searchOriginCoords: state.searchDestinationCoords,
    searchDestinationAddress: state.searchOriginAddress,
    searchDestinationCoords: state.searchDestinationCoords,
    searchOriginXShowing: state.searchDestinationXShowing,
    searchDestinationXShowing: state.searchOriginXShowing
  });
};

const mapSetZoomLevel: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { mapZoomLevel:  action.body })
};

const mapSetCenter: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { mapCenterLat: action.body.lat, mapCenterLng: action.body.lng })
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

// TODO: if someone cancels or redos their search while a request was in progress, it needs to cancal that


const searchSubmit: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchProgress: ProgressSteps.PENDING_1 });
};

const searchResultReceived: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchProgress: ProgressSteps.VIEWING_RESULT , searchResult: action.body});
};

const searchErrorReceived: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchProgress: ProgressSteps.ERROR_1, searchError: action.body });
};

const searchBookReserv: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchProgress: ProgressSteps.READING_INFO });
};

const searchConfirmBook: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchProgress: ProgressSteps.PENDING_2 });
};

const searchReservBooked: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchProgress: ProgressSteps.VIEWING_RESERV });
};

const searchReservError: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchProgress: ProgressSteps.ERROR_2 });
};

const searchBackOneStep: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  let newProgress;

  switch (state.searchProgress) {
    case ProgressSteps.PENDING_1:
    case ProgressSteps.VIEWING_RESULT:
    case ProgressSteps.ERROR_1:
      newProgress = ProgressSteps.NO_SEARCH;
      break;
    case ProgressSteps.READING_INFO:
      newProgress = ProgressSteps.VIEWING_RESULT;
      break;
    case ProgressSteps.PENDING_2:
    case ProgressSteps.NO_SEARCH:
    case ProgressSteps.VIEWING_RESERV:
    case ProgressSteps.ERROR_2:
      break;
  }
  return tassign(state, {searchProgress: newProgress })
};

const searchReset: Reducer<IAppState> = (state: IAppState, action: Action): IAppState => {
  return tassign(state, { searchProgress: ProgressSteps.NO_SEARCH, searchResult: undefined });
};

export function rootReducer(state: IAppState, action: Action): IAppState {
  switch (action.type) {
    case SEARCH_ORIGIN_CHANGE: return searchOriginChange(state, action);
    case SEARCH_ORIGIN_CLEAR: return searchOriginClear(state, action);

    case SEARCH_ORIGIN_ADDRESS_TEMP_CLEAR: return searchOriginAddressTempClear(state, action);
    case SEARCH_ORIGIN_ADDRESS_START_FETCH: return searchOriginAddressStartFetch(state, action);
    case SEARCH_ORIGIN_ADDRESS_STOP_FETCH: return searchOriginAddressStopFetch(state, action);

    case SEARCH_DESTINATION_CHANGE: return searchDestinationChange(state, action);
    case SEARCH_DESTINATION_CLEAR: return searchDestinationClear(state, action);

    case SEARCH_DESTINATION_ADDRESS_TEMP_CLEAR: return searchDestinationAddressTempClear(state, action);
    case SEARCH_DESTINATION_ADDRESS_START_FETCH: return searchDestinationAddressStartFetch(state, action);
    case SEARCH_DESTINATION_ADDRESS_STOP_FETCH: return searchDestinationAddressStopFetch(state, action);

    case SEARCH_SWITCH_INPUTS: return searchSwitchInputs(state, action);
    case SEARCH_ADD_DAY: return searchAddDay(state, action);
    case SEARCH_SUBTRACT_DAY: return searchSubtractDay(state, action);
    case SEARCH_ADD_TEN_MINUTES: return searchAddTenMinutes(state, action);
    case SEARCH_SUBTRACT_TEN_MINUTES: return searchSubtractTenMinutes(state, action);

    case SEARCH_CHANGE_TIMETARGET: return searchChangeTimeTarget(state, action);
    case SEARCH_SET_TIME_TO_NOW: return searchSetTimeToNow(state, action);

    case SEARCH_SUBMIT: return searchSubmit(state, action);
    case SEARCH_RESULT_RECEIVED: return searchResultReceived(state, action);
    case SEARCH_ERROR_RECEIVED: return searchErrorReceived(state, action);
    case SEARCH_BOOK_RESERV: return searchBookReserv(state, action);
    case SEARCH_CONFIRM_BOOK: return searchConfirmBook(state, action);
    case SEARCH_RESERV_BOOKED: return searchReservBooked(state, action);
    case SEARCH_RESERV_ERROR: return searchReservError(state, action);

    case SEARCH_BACK_ONE_STEP: return searchBackOneStep(state, action);
    case SEARCH_RESET: return searchReset(state, action);

    case MAP_SET_ZOOMLEVEL: return mapSetZoomLevel(state, action);
    case MAP_SET_CENTER: return mapSetCenter(state, action);

    case MAP_RENDERING_START: return mapRenderingStart(state, action);
    case MAP_RENDERING_STOP: return mapRenderingStop(state, action);
  }
  return state;
}
