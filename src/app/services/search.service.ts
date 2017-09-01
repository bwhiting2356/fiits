import { Injectable } from '@angular/core';
import { IAppState } from '../redux/store';
import { Place } from '../shared/place.model';
import {
  MAP_REDO_FITBOUNDS,
  SEARCH_ADD_DAY,
  SEARCH_ADD_TEN_MINUTES,
  SEARCH_CANCEL_FETCH,
  SEARCH_CHANGE_TIMETARGET,
  SEARCH_DESTINATION_ADDRESS_START_FETCH,
  SEARCH_DESTINATION_ADDRESS_STOP_FETCH,
  SEARCH_DESTINATION_ADDRESS_TEMP_CLEAR,
  SEARCH_DESTINATION_CHANGE,
  SEARCH_DESTINATION_CLEAR,
  SEARCH_DESTINATION_HIDE_X,
  SEARCH_DESTINATION_SHOW_X,
  SEARCH_FETCH_RESULT,
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
  SEARCH_SUBTRACT_TEN_MINUTES
} from '../redux/actions';
import { NgRedux } from '@angular-redux/store';
import { TimeTarget } from '../shared/timetarget.model';
import { TripQueryRequest } from '../shared/tripqueryrequest.model';
import { TripQueryResponse} from '../shared/tripqueryresponse.model'

import { MapService } from './map.service';

@Injectable()
export class SearchService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private mapService: MapService
  ) { }

  searchParametersChanged() {
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

      console.log(tripQueryRequest);
      this.ngRedux.dispatch({ type: SEARCH_FETCH_RESULT });

      // make request to server



      // on response

      setTimeout(() => {    // fake right now
        const tripQueryResponse: TripQueryResponse = {
          startAddress: '576 Marcy Ave',
          startLocation: {
            lat: 40.695197,
            lng: -73.949425
          },
          startTime: new Date(),
          walkingTime1: '3 min',
          walkingDistance1: '240 ft',
          station1Location: {
            lat: 40.697225,
            lng: -73.952939
          },
          station1Address: 'ABC Unknown',
          station1ReservationStartTime: new Date(),
          station1ReservationEndTime: new Date(),
          station1ReservationPrice: 0.50,

          bikeRentalPrice: 0.75,
          bikeTime: '25 min',
          bikeDistance: '1.2 mi',
          station2Location: {
            lat: 40.682607,
            lng: -73.917133
          },
          station2Address: 'XYZ Unknown',
          station2ReservationStartTime: new Date(),
          station2ReservationEndTime: new Date(),
          station2ReservationPrice: -0.80,

          walkingTime2: '5 min',
          walkingDistance2: '479 ft',
          endAddress: '782 MacDonough St',
          endLocation: {
            lat: 40.684498,
            lng: -73.915087
          },
          endTime: new Date()
        };

        this.ngRedux.dispatch({ type: SEARCH_CANCEL_FETCH });
        this.ngRedux.dispatch({ type: SEARCH_RESULT_RECEIVED, body: tripQueryResponse });

        this.mapService.renderWalking1Directions(
          tripQueryResponse.startLocation,
          tripQueryResponse.station1Location);

        this.mapService.renderBikeDirections(
          tripQueryResponse.station1Location,
          tripQueryResponse.station2Location);

        this.mapService.renderWalking2Directions(
          tripQueryResponse.station2Location,
          tripQueryResponse.endLocation);

        // TODO: redo the bounds of the map after the directions have been loaded
        // this.ngRedux.dispatch({ type: MAP_REDO_FITBOUNDS }); // this isn't working for some reason....

      }, 3000)



    } else {
      this.ngRedux.dispatch({ type: SEARCH_CANCEL_FETCH });
    }
  }

  searchOriginChange(origin: Place) {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CHANGE, body: origin});
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_SHOW_X });
    this.ngRedux.dispatch({ type: MAP_REDO_FITBOUNDS });
    this.searchParametersChanged();
  }

  searchOriginClear() {
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CLEAR });
    this.searchParametersChanged();
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
    this.ngRedux.dispatch({ type: MAP_REDO_FITBOUNDS });
    this.searchParametersChanged();
  }

  searchDestinationClear() {
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CLEAR });
    this.searchParametersChanged();
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
    this.searchParametersChanged();
  }

  subtractDay() {
    this.ngRedux.dispatch({ type: SEARCH_SUBTRACT_DAY });
    this.searchParametersChanged();
  }

  addTenMinutes() {
    this.ngRedux.dispatch({ type: SEARCH_ADD_TEN_MINUTES });
    this.searchParametersChanged();
  }

  subractTenMinutes() {
    this.ngRedux.dispatch({ type: SEARCH_SUBTRACT_TEN_MINUTES });
    this.searchParametersChanged();
  }

  changeTimeTarget(value: String) {
    switch (value) {
      case 'Leave now': {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.LEAVE_NOW });
        this.ngRedux.dispatch({ type: SEARCH_SET_TIME_TO_NOW });
        this.searchParametersChanged();
        break;
      }
      case 'Depart at': {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.DEPART_AT });
        this.searchParametersChanged();
        break;
      }
      case 'Arrive by': {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.ARRIVE_BY });
        this.searchParametersChanged();
        break;
      }
    }
  }
}
