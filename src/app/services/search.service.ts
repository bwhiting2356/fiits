import { Injectable } from '@angular/core';

import { Place } from '../shared/place.model';
import { TimeTarget } from '../shared/timetarget.model';
import { TripQueryRequest } from '../shared/tripqueryrequest.model';
import { TripQueryResponse} from '../shared/tripqueryresponse.model';
import { ProgressSteps } from '../shared/progressSteps';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import {
  MAP_RENDERING_START,
  MAP_RENDERING_STOP,
  SEARCH_ADD_DAY,
  SEARCH_ADD_TEN_MINUTES,
  SEARCH_CHANGE_TIMETARGET,
  SEARCH_DESTINATION_ADDRESS_START_FETCH,
  SEARCH_DESTINATION_ADDRESS_STOP_FETCH,
  SEARCH_DESTINATION_ADDRESS_TEMP_CLEAR,
  SEARCH_DESTINATION_CHANGE,
  SEARCH_DESTINATION_CLEAR,
  SEARCH_DESTINATION_HIDE_X,
  SEARCH_DESTINATION_SHOW_X,
  SEARCH_NAV_BOOK_CONFIRMED,
  SEARCH_NAV_BOOK_REQUESTED,
  SEARCH_NAV_NO_SEARCH,
  SEARCH_NAV_RES_RECEIVED, SEARCH_NAV_SUBMITTED,
  SEARCH_ORIGIN_ADDRESS_START_FETCH,
  SEARCH_ORIGIN_ADDRESS_STOP_FETCH,
  SEARCH_ORIGIN_ADDRESS_TEMP_CLEAR,
  SEARCH_ORIGIN_CHANGE,
  SEARCH_ORIGIN_CLEAR,
  SEARCH_ORIGIN_HIDE_X,
  SEARCH_ORIGIN_SHOW_X,
  SEARCH_RESULT_RECEIVED,
  SEARCH_SET_TIME_TO_NOW,
  SEARCH_SUBTRACT_DAY,
  SEARCH_SUBTRACT_TEN_MINUTES, SEARCH_SWITCH_INPUTS
} from '../redux/actions';

import { MapService } from './map.service';
import { FitboundsService } from './fitbounds.service';

import { tripQueryResponse } from './mock-data/fake-response';

@Injectable()
export class SearchService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private mapService: MapService,
    private fitboundsService: FitboundsService
  ) { }

  searchNavNoSearch() {
    this.ngRedux.dispatch({ type: SEARCH_NAV_NO_SEARCH })
  }

  searchNavResReceived() {
    this.ngRedux.dispatch({ type: SEARCH_NAV_RES_RECEIVED })
  }

  searchNavBookRequested() {
    this.ngRedux.dispatch({ type: SEARCH_NAV_BOOK_REQUESTED })
  }

  searchNavReadInfo() {
    this.ngRedux.dispatch({ type: SEARCH_NAV_INFO_READ })
  }

  searchNavBookConfirmed() {
    this.ngRedux.dispatch({ type: SEARCH_NAV_BOOK_CONFIRMED })
  }

  backOneStep() {
    const progressState = this.ngRedux.getState().searchProgress;
    switch (progressState) {
      case ProgressSteps.searchSubmitted:
        this.ngRedux.dispatch({ type: SEARCH_NAV_NO_SEARCH });
        break;
      case ProgressSteps.resultReceived:
        this.ngRedux.dispatch({ type: SEARCH_NAV_NO_SEARCH });
        break;
      case ProgressSteps.noSearch:
      case ProgressSteps.bookingRequested:
      case ProgressSteps.bookingConfirmed:
        break;
    }
  }

  cancelSearch() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CLEAR });
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CLEAR });
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_HIDE_X });
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_HIDE_X });
    this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.LEAVE_NOW });
    this.ngRedux.dispatch({ type: SEARCH_NAV_NO_SEARCH })
  }

  searchNavSubmitted() {
    this.ngRedux.dispatch({ type: SEARCH_NAV_SUBMITTED });
    this.ngRedux.dispatch({ type: MAP_RENDERING_START });
    this.mapService.removePolylines(); // TODO: is there a more redux-like way of taking care of this?

    const state: IAppState = this.ngRedux.getState();

    if (state.searchOrigin && state.searchDestination) {

      const tripQueryRequest: TripQueryRequest = {
        searchOriginCoords: state.searchOrigin.coords,
        searchDestinationCoords: state.searchDestination.coords,
        searchDatetime: state.searchDatetime,
        searchTimeTarget: state.searchTimeTarget
      };

      // TODO: check if new trip query is the same as the old trip query before sending
      // TODO: throttle events when requests keep changing? Client side or server side?

      // make request to server



      // on response

      setTimeout(() => {    // fake right now
        this.ngRedux.dispatch({ type: SEARCH_NAV_RES_RECEIVED });
        this.ngRedux.dispatch({ type: SEARCH_RESULT_RECEIVED, body: tripQueryResponse });
        this.fitboundsService.setMapBounds();

        this.mapService.addWalking1Directions(
          tripQueryResponse.startLocation,
          tripQueryResponse.station1Location);

        this.mapService.addBikeDirections(
          tripQueryResponse.station1Location,
          tripQueryResponse.station2Location);

        this.mapService.addWalking2Directions(
          tripQueryResponse.station2Location,
          tripQueryResponse.endLocation);

        // TODO: get directions on the server side, send list of points back with the response data

        this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });

      }, 1000)
    } else {
      // this.ngRedux.dispatch({ type: SEARCH_CANCEL_FETCH });
      this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });
    }
  }

  searchOriginChange(origin: Place) {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CHANGE, body: origin});
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_SHOW_X });
    this.fitboundsService.setMapBounds();
  }

  searchOriginClear() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CLEAR });
    // this.searchParametersChanged();
  }

  searchOriginShowX() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_SHOW_X });
  }

  searchOriginHideX() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_HIDE_X });
  }

  searchOriginAddressTempClear() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_ADDRESS_TEMP_CLEAR });
  }

  searchOriginAddressStartFetch() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_HIDE_X });
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_ADDRESS_START_FETCH });
  }

  searchOriginAddressStopFetch() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_ADDRESS_STOP_FETCH });
  }

  searchDestinationChange(destination: Place) {
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CHANGE, body: destination});
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_SHOW_X });
    this.fitboundsService.setMapBounds();
  }

  searchDestinationClear() {
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CLEAR });
    // this.searchParametersChanged();
  }

  searchSwitchInputs() {
    this.ngRedux.dispatch({ type: SEARCH_SWITCH_INPUTS });
    // this.searchParametersChanged();
  }

  searchDestinationShowX() {
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_SHOW_X });
  }

  searchDestinationHideX() {
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_HIDE_X });
  }

  searchDestinationAddressTempClear() {
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_ADDRESS_TEMP_CLEAR });
  }

  searchDestinationAddressStartFetch() {
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_HIDE_X });
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_ADDRESS_START_FETCH });
  }

  searchDestinationAddressStopFetch() {
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_ADDRESS_STOP_FETCH });
  }

  addDay() {
    this.ngRedux.dispatch({ type: SEARCH_ADD_DAY });
  }

  subtractDay() {
    this.ngRedux.dispatch({ type: SEARCH_SUBTRACT_DAY });
  }

  addTenMinutes() {
    this.ngRedux.dispatch({ type: SEARCH_ADD_TEN_MINUTES });
  }

  subractTenMinutes() {
    this.ngRedux.dispatch({ type: SEARCH_SUBTRACT_TEN_MINUTES });
  }

  changeTimeTarget(value: String) {
    switch (value) {
      case TimeTarget.LEAVE_NOW: {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.LEAVE_NOW });
        this.ngRedux.dispatch({ type: SEARCH_SET_TIME_TO_NOW });
        break;
      }
      case TimeTarget.DEPART_AT: {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.DEPART_AT });
        break;
      }
      case TimeTarget.ARRIVE_BY: {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.ARRIVE_BY });
        break;
      }
    }
  }
}
