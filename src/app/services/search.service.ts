import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/take';

import { TimeTargets } from '../shared/timeTarget';
import { TripQueryRequest } from '../shared/tripQueryRequest';

import { MapService } from './map.service';
import { FitboundsService } from './fitbounds.service';
import { parseTripQueryResponse } from './parseTripQueryResponse';
import { buildTripQueryRequest } from './buildTripQueryRequest';
import {
  ChangeDatetime, ChangeTimeTarget,
  OriginFocus, DestinationFocus, NoFocus,
  OriginAddressChange, OriginCoordsChange, DestinationAddressChange, DestinationCoordsChange,
  OriginStartFetch, OriginStopFetch, DestinationStartFetch, DestinationStopFetch,
  SubmitQuery, QueryResultReceived,
  NavigateToStep, Reset, QueryErrorReceived, ConfirmBook, BookingSuccess, BookingError
} from '../home/store/search.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import { Coords } from '../shared/coords';
import { addMinutes } from '../shared/timeHelperFunctions/addMinutes';
import { subtractMinutes } from '../shared/timeHelperFunctions/subtractMinutes';
import { addDay } from '../shared/timeHelperFunctions/addDay';
import { subtractDay } from '../shared/timeHelperFunctions/subtractDay';
import { ProgressSteps } from '../shared/progressSteps';
import 'rxjs/add/operator/first';
import { ShowSignUp } from '../auth/store/auth.actions';

@Injectable()
export class SearchService {
  constructor(
    private store: Store<AppState>,
    private mapService: MapService,
    private fitboundsService: FitboundsService,
  ) { }

  queryResultReceived(res) {
    this.store.dispatch(new QueryResultReceived(parseTripQueryResponse(res))
    )
  }

  queryErrorReceived(res) {
    this.store.dispatch(new QueryErrorReceived(res.error));
  }

  readInfo() {
    this.store.dispatch(new NavigateToStep(ProgressSteps.READING_INFO));
  }

  confirmBook() {
    this.store
      .first()
      .map(state => state.search.result.response.tripId)
      .subscribe(tripId => {
        this.store.dispatch(new ConfirmBook({ tripId }))
      })
  }

  bookingSuccess() {
    this.store.dispatch(new BookingSuccess())
  }

  bookingError(err) {
    this.store.dispatch(new BookingError(err));
  }

  // ***** SEARCH INPUT NATIVAGION *****

  backOneStep() {
    this.store.first().subscribe(state => {
      let newProgress: string;
      switch (state.search.progress) {
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
        case ProgressSteps.BOOKING_SUCCESS:
        case ProgressSteps.ERROR_2:
          break;
      }
      this.store.dispatch(new NavigateToStep(newProgress))
    });
  }

  reset() {
    this.store.dispatch(new Reset());
    // TODO: tell the server to delete the temporary reservations if the user doesn't go through with it
    // TODO: display some sort of timer showing the time remaining holding the reservation
    // TODO: better progress bar (with greyed out section, rounded corners like screen shot)
  }

  // ***** SERVER REQUEST/RESPONSE/ERROR *****

  searchSubmit() {
    this.store.first().subscribe(state => {
      const request: TripQueryRequest = {
        originAddress: state.search.origin.address,
        originCoords: state.search.origin.coords,
        destinationAddress: state.search.destination.address,
        destinationCoords: state.search.destination.coords,
        time: state.search.time.time,
        timeTarget: state.search.time.timeTarget
      };
      this.store.dispatch(new SubmitQuery(request));
    });

    // this.ngRedux.dispatch({ type: SEARCH_SUBMIT });
    // this.ngRedux.dispatch({ type: MAP_RENDERING_START });

    // const state: IAppState = this.ngRedux.getState();
    //
    // if (state.searchOriginAddress && state.searchDestinationAddress) {
    //   // TODO: check if new trip query is the same as the old trip query before sending
    //   // TODO: throttle events when requests keep changing? Client side or server side?
    //
    //   const tripQueryRequest = buildTripQueryRequest(state);
    //   this.http.post('http://localhost:3000/api/trip-query', tripQueryRequest).subscribe(response => {
    //     const tripQueryResponse = parseTripQueryResponse(response);
    //
    //     this.ngRedux.dispatch({ type: SEARCH_RESULT_RECEIVED, body: tripQueryResponse });
    //     this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });
    //
    //     // TODO: refactor into a better function, also account for possibly the destination being current location
    //
    //     // update address or keep as current location
    //
    //     this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CHANGE, body: {
    //       address: tripQueryResponse.destinationAddress,
    //       coords: tripQueryResponse.destinationCoords
    //     }});
    //   }, (err) => {
    //     console.log(err);
    //   });
    //
    //   // setTimeout(() => {    // fake right now
    //   //   this.ngRedux.dispatch({ type: SEARCH_RESULT_RECEIVED, body: tripQueryResponse });
    //   //   this.fitboundsService.setMapBounds();
    //   //
    //   //   this.mapService.addWalking1Directions(
    //   //     tripQueryResponse.startLocation,
    //   //     tripQueryResponse.station1Location);
    //   //
    //   //   this.mapService.addBikeDirections(
    //   //     tripQueryResponse.station1Location,
    //   //     tripQueryResponse.station2Location);
    //   //
    //   //   this.mapService.addWalking2Directions(
    //   //     tripQueryResponse.station2Location,
    //   //     tripQueryResponse.endLocation);
    //   //
    //   //   // TODO: get directions on the server side, send list of points back with the response data
    //   //
    //   //   this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });
    //   //
    //   // }, 100)
    //
    //   // setTimeout(() => {
    //   //   this.ngRedux.dispatch({ type: SEARCH_ERROR_RECEIVED , body: 'Error message' })
    //   // }, 1000)
    // } else {
    //   // this.ngRedux.dispatch({ type: SEARCH_CANCEL_FETCH });
    //   this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });
    // }
  }

  // searchOriginUpdateFromResponse(tripQueryRequest) {
  //
  //   const newDisplayAddress = tripQueryRequest.originAddress === 'Current Location'
  //     ? tripQueryRequest.originAddress
  //     : tripQueryResponse.originAddress;
  //
  //   this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CHANGE, body: {
  //     address: newDisplayAddress,
  //     coords: tripQueryResponse.originCoords
  //   }});
  //
  // }

  searchOriginAddAddress(address) {
    // this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CHANGE, body: { address, coords: undefined }});
  }

  originNewLocation(address: string, coords: Coords) {
    this.originChange(address, coords);
    this.fitboundsService.update();
  }

  originChange(address: string, coords: Coords) {
    this.store.dispatch(new OriginAddressChange(address));
    this.store.dispatch(new OriginCoordsChange(coords));
    this.originFocus();

    // TODO: something is broken about 'Current Location'
  }

  originClear() {
    this.originChange('', undefined);
    this.originFocus();
  }

  searchOriginAddressTempClear() {
    this.store.dispatch(new OriginAddressChange(''));
  }

  originAddressStartFetch() {
    this.store.dispatch(new OriginStartFetch());
  }

  originAddressStopFetch() {
    this.store.dispatch(new OriginStopFetch());
  }


  destinationNewLocation(address, coords) {
    this.destinationChange(address, coords);
    this.fitboundsService.update();
  }

  destinationChange(address, coords) {
    this.store.dispatch(new DestinationAddressChange(address));
    this.store.dispatch(new DestinationCoordsChange(coords));
    this.destinationFocus();
  }

  destinationClear() {
    this.destinationChange('', undefined);
    this.destinationFocus();
  }

  searchDestinationAddAddress(address) {
    // this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CHANGE, body: { address, coords: undefined }});
  }

  searchDestinationAddressTempClear() {
    this.store.dispatch(new DestinationAddressChange(''));
  }

  searchDestinationAddressStartFetch() {
    this.store.dispatch(new DestinationStartFetch());
  }

  searchDestinationAddressStopFetch() {
    this.store.dispatch(new DestinationStopFetch());
  }

  // ***** CHANGE TIME, TIME TARGET *****

  addDay() {
    this.store.first().subscribe(state => {
      const date = state.search.time.time;
      const dateDate = addDay(date);
      this.store.dispatch(new ChangeDatetime(dateDate))
    });
  }

  subtractDay() {
    this.store.first().subscribe(state => {
      const date = state.search.time.time;
      const dateDate = subtractDay(date);
      this.store.dispatch(new ChangeDatetime(dateDate))
    });
  }

  addMinutes(value) {
    this.store.first().subscribe(state => {
      const time = state.search.time.time;
      const newTime = addMinutes(time, value);
      this.store.dispatch(new ChangeDatetime(newTime))
    });
  }

  subractMinutes(value) {
    this.store.first().subscribe(state => {
      const time = state.search.time.time;
      const newTime = subtractMinutes(time, value);
      this.store.dispatch(new ChangeDatetime(newTime))
    });
  }

  changeTimeTarget(value: String) {
    switch (value) {
      case TimeTargets.LEAVE_NOW: {
        this.store.dispatch(new ChangeTimeTarget(TimeTargets.LEAVE_NOW));
        this.store.dispatch(new ChangeDatetime(new Date()));
        break;
      }
      case TimeTargets.DEPART_AT: {
        this.store.dispatch(new ChangeTimeTarget(TimeTargets.DEPART_AT));
        break;
      }
      case TimeTargets.ARRIVE_BY: {
        this.store.dispatch(new ChangeTimeTarget(TimeTargets.ARRIVE_BY));
        break;
      }
    }
  }

  // ***** FOCUS INPUTS *****

  originFocus() {
    this.store.dispatch(new OriginFocus());
  }

  destinationFocus() {
    this.store.dispatch(new DestinationFocus());
  }

  noFocus() {
    this.store.dispatch(new NoFocus());
  }

  updateInputFocus() {
    this.store.first().subscribe(state => {
      if (state.search.origin.address.length === 0) {
        // console.log("this happened 320")
        this.originFocus();
      } else if (state.search.destination.address.length === 0) {
        this.destinationFocus();
      } else {
        this.noFocus();
      }
    });
  }

  // ***** SWITCH INPUTS *****

  switchInputs() {
    this.store.first().subscribe(state => {
      const originAddress = state.search.origin.address;
      const originCoords = state.search.origin.coords;
      const destinationAddress = state.search.destination.address;
      const destinationCoords = state.search.destination.coords;

      this.destinationChange(originAddress, originCoords);
      this.originChange(destinationAddress, destinationCoords);
      this.updateInputFocus();
    });
  }
}
