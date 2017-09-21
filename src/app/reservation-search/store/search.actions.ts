import { Action } from '@ngrx/store';
import { Coords } from '../../shared/coords';
import {TripQueryRequest} from "../../shared/tripQueryRequest";
import {TripQueryResponse} from "../../shared/tripQueryResponse";
import {TimeTarget} from "../../shared/timeTarget";

export const ORIGIN_ADDRESS_CHANGE = 'ORIGIN_ADDRESS_CHANGE';
export const ORIGIN_COORDS_CHANGE = 'ORIGIN_COORDS_CHANGE';
export const ORIGIN_START_FETCH = 'ORIGIN_START_FETCH';
export const ORIGIN_STOP_FETCH = 'ORIGIN_STOP_FETCH';
export const ORIGIN_FOCUS = 'ORIGIN_FOCUS';

export const DESTINATION_ADDRESS_CHANGE = 'DESTINATION_ADDRESS_CHANGE';
export const DESTINATION_COORDS_CHANGE = 'DESTINATION_COORDS_CHANGE';
export const DESTINATION_START_FETCH = 'DESTINATION_START_FETCH';
export const DESTINATION_STOP_FETCH = 'DESTINATION_STOP_FETCH';
export const DESTINATION_FOCUS = 'DESTINATION_FOCUS';

export const NO_FOCUS = 'NO_FOCUS';

// export const ADD_DAY = 'ADD_DAY';
// export const SUBTRACT_DAY = 'SUBTRACT_DAY';
// export const ADD_MINUTES = 'ADD_MINUTES';
// export const SUBTRACT_MINUTES = 'SUBTRACT_MINUTES';


export const CHANGE_DATETIME = 'CHANGE_TIME';
export const CHANGE_TIME_TARGET = 'CHANGE_TIME_TARGET';
export const CHANGE_PROGRESS = 'CHANGE_PROGRESS';

export const SUBMIT_QUERY = 'SUBMIT_QUERY';
export const QUERY_RESULT_RECEIVED = 'RESULT_RECEIVED';
export const QUERY_ERROR_RECEIVED = 'ERROR_RECEIVED';
// export const BOOK_RESERV = 'BOOK_RESERV';
export const CONFIRM_BOOK = 'CONFIRM_BOOK';
export const BOOKING_SUCCESS = 'BOOKING_SUCCESS';
export const BOOKING_ERROR = 'BOOKING_ERROR';

export const MAP_SET_ZOOMLEVEL = 'MAP_SET_ZOOMLEVEL';
export const MAP_SET_CENTER = 'MAP_SET_CENTER';

export const MAP_START_RENDERING = 'MAP_START_RENDERING';
export const MAP_STOP_RENDERING = 'MAP_STOP_RENDERING';

// ********** Search Origin Actions **********

export class OriginAddressChange implements Action {
  readonly type = ORIGIN_ADDRESS_CHANGE;

  constructor(public payload: string) {}
}

export class OriginCoordsChange implements Action {
  readonly type = ORIGIN_COORDS_CHANGE;

  constructor(public payload: Coords) {}
}

export class OriginStartFetch implements Action {
  readonly type = ORIGIN_START_FETCH;
}

export class OriginStopFetch implements Action {
  readonly type = ORIGIN_STOP_FETCH;
}

export class OriginFocus implements Action {
  readonly type = ORIGIN_FOCUS
}

// ********** Search Destination Actions **********

export class DestinationAddressChange implements Action {
  readonly type = DESTINATION_ADDRESS_CHANGE;

  constructor(public payload: string) {}
}

export class DestinationCoordsChange implements Action {
  readonly type = DESTINATION_COORDS_CHANGE;

  constructor(public payload: Coords) {}
}

export class DestinationStartFetch implements Action {
  readonly type = DESTINATION_START_FETCH;
}

export class DestinationStopFetch implements Action {
  readonly type = DESTINATION_STOP_FETCH;
}

export class DestinationFocus implements Action {
  readonly type = DESTINATION_FOCUS
}

export class NoFocus implements Action {
  readonly type = NO_FOCUS
}

// ********** Search Time Actions **********

export class ChangeDatetime implements Action {
  readonly type = CHANGE_DATETIME;

  constructor(public payload: Date) {}
}

export class ChangeTimeTarget implements Action {
  readonly type = CHANGE_TIME_TARGET;

  constructor(public payload: TimeTarget) {}
}

// ********** Search Progress Actions **********

export class ChangeProgress implements Action {
  readonly type = CHANGE_PROGRESS;

  constructor(public payload: string) {}
}

// ********** Trip Request/Response Actions **********

export class SubmitQuery implements Action {
  readonly type = SUBMIT_QUERY;

  constructor(public payload: TripQueryRequest) {}
}

export class QueryResultReceived implements Action {
  readonly type = QUERY_RESULT_RECEIVED;

  constructor(public payload: TripQueryResponse) {}
}

export class QueryErrorReceived implements Action {
  readonly type = QUERY_ERROR_RECEIVED;

  constructor(public payload: string) {}
}

export class ConfirmBook implements Action {
  readonly type = CONFIRM_BOOK;
}

export class BookingSuccess implements Action {
  readonly type = BOOKING_SUCCESS;
}

export class BookingError implements Action {
  readonly type = BOOKING_ERROR;
}

// ********** Search Map Actions **********

export class MapSetZoomlevel implements Action {
  readonly type = MAP_SET_ZOOMLEVEL;

  constructor(public payload: number) {}
}

export class MapSetCenter implements Action {
  readonly type = MAP_SET_CENTER;

  constructor(public payload: Coords) {}
}

export class MapStartRendering implements Action {
  readonly type = MAP_START_RENDERING;
}

export class MapStopRendering implements Action {
  readonly type = MAP_STOP_RENDERING;
}

export type Actions
  = OriginAddressChange
  | OriginCoordsChange
  | OriginStartFetch
  | OriginStopFetch
  | OriginFocus
  | DestinationAddressChange
  | DestinationCoordsChange
  | DestinationStartFetch
  | DestinationStopFetch
  | DestinationFocus
  | NoFocus
  | ChangeDatetime
  | ChangeTimeTarget
  | ChangeProgress
  | SubmitQuery
  | QueryResultReceived
  | QueryErrorReceived
  | ConfirmBook
  | BookingSuccess
  | BookingError
  | MapSetZoomlevel
  | MapSetCenter
  | MapStartRendering
  | MapStopRendering;
