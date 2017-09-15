import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../shared/place';
import { TimeTarget } from '../shared/timeTarget';
import { TripQueryRequest } from '../shared/tripQueryRequest';
import { TripQueryResponse} from '../shared/tripQueryResponse';
import { ProgressSteps } from '../shared/progressSteps';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import {
  MAP_RENDERING_START,
  MAP_RENDERING_STOP,
  SEARCH_ADD_DAY,
  SEARCH_ADD_TEN_MINUTES,
  SEARCH_BACK_ONE_STEP, SEARCH_BOOK_RESERV,
  SEARCH_CHANGE_TIMETARGET, SEARCH_CONFIRM_BOOK,
  SEARCH_DESTINATION_ADDRESS_START_FETCH,
  SEARCH_DESTINATION_ADDRESS_STOP_FETCH,
  SEARCH_DESTINATION_ADDRESS_TEMP_CLEAR,
  SEARCH_DESTINATION_CHANGE,
  SEARCH_DESTINATION_CLEAR,
  SEARCH_DESTINATION_HIDE_X,
  SEARCH_DESTINATION_SHOW_X, SEARCH_ERROR_RECEIVED,
  SEARCH_ORIGIN_ADDRESS_START_FETCH,
  SEARCH_ORIGIN_ADDRESS_STOP_FETCH,
  SEARCH_ORIGIN_ADDRESS_TEMP_CLEAR,
  SEARCH_ORIGIN_CHANGE,
  SEARCH_ORIGIN_CLEAR,
  SEARCH_ORIGIN_HIDE_X,
  SEARCH_ORIGIN_SHOW_X, SEARCH_RESERV_BOOKED, SEARCH_RESERV_ERROR,
  SEARCH_RESET,
  SEARCH_RESULT_RECEIVED,
  SEARCH_SET_TIME_TO_NOW,
  SEARCH_SUBMIT,
  SEARCH_SUBTRACT_DAY,
  SEARCH_SUBTRACT_TEN_MINUTES, SEARCH_SWITCH_INPUTS
} from '../redux/actions';

import { MapService } from './map.service';
import { FitboundsService } from './fitbounds.service';

// import { tripQueryResponse } from './mock-data/fake-response';


@Injectable()
export class SearchService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private mapService: MapService,
    private fitboundsService: FitboundsService,
    private http: HttpClient
  ) { }

  searchResultReceived() {
    this.ngRedux.dispatch({ type: SEARCH_RESULT_RECEIVED });
  }

  searchErrorReceived() {
    this.ngRedux.dispatch({ type: SEARCH_ERROR_RECEIVED });
  }

  searchBookReserv() {
    this.ngRedux.dispatch({ type: SEARCH_BOOK_RESERV });
  }

  searchConfirmBook() {
    this.ngRedux.dispatch({ type: SEARCH_CONFIRM_BOOK });

    // successful reservation booking

    setTimeout(() => {
      this.ngRedux.dispatch({ type: SEARCH_RESERV_BOOKED });

    }, 1000)

    // error

    // setTimeout(() => {
    //   this.ngRedux.dispatch({ type: SEARCH_RESERV_ERROR });
    // }, 1000)
  }


  searchBackOneStep() {
    this.ngRedux.dispatch({ type: SEARCH_BACK_ONE_STEP });
  }

  searchReset() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CLEAR });
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CLEAR });
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_HIDE_X });
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_HIDE_X });
    this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.LEAVE_NOW });
    this.ngRedux.dispatch({ type: SEARCH_RESET })
  }

  searchSubmit() {
    this.ngRedux.dispatch({ type: SEARCH_SUBMIT });
    this.ngRedux.dispatch({ type: MAP_RENDERING_START });

    const state: IAppState = this.ngRedux.getState();

    if (state.searchOrigin && state.searchDestination) {

      const tripQueryRequest: TripQueryRequest = {
        origin: state.searchOrigin.coords,
        destination: state.searchDestination.coords,
        time: state.searchDatetime,
        timeTarget: state.searchTimeTarget
      };

      // TODO: check if new trip query is the same as the old trip query before sending
      // TODO: throttle events when requests keep changing? Client side or server side?

      // make request to server

      // on response

      this.http.post('http://localhost:3000/api/trip-query', tripQueryRequest).subscribe(tripQueryResponse => {
        console.log(tripQueryResponse);
        this.ngRedux.dispatch({ type: SEARCH_RESULT_RECEIVED, body: tripQueryResponse });
        this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });
      }, (err) => {
        console.log(err);
      });

      // setTimeout(() => {    // fake right now
      //   this.ngRedux.dispatch({ type: SEARCH_RESULT_RECEIVED, body: tripQueryResponse });
      //   this.fitboundsService.setMapBounds();
      //
      //   this.mapService.addWalking1Directions(
      //     tripQueryResponse.startLocation,
      //     tripQueryResponse.station1Location);
      //
      //   this.mapService.addBikeDirections(
      //     tripQueryResponse.station1Location,
      //     tripQueryResponse.station2Location);
      //
      //   this.mapService.addWalking2Directions(
      //     tripQueryResponse.station2Location,
      //     tripQueryResponse.endLocation);
      //
      //   // TODO: get directions on the server side, send list of points back with the response data
      //
      //   this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });
      //
      // }, 100)

      // setTimeout(() => {
      //   this.ngRedux.dispatch({ type: SEARCH_ERROR_RECEIVED , body: 'Error message' })
      // }, 1000)
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
