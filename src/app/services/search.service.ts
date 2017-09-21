import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/take';

import { Place } from '../shared/place';
import {TimeTarget, TimeTargets} from '../shared/timeTarget';
import { TripQueryRequest } from '../shared/tripQueryRequest';

import { MapService } from './map.service';
import { FitboundsService } from './fitbounds.service';
import { IAppState } from '../redux/IAppState';
import {parseTripQueryResponse} from "./parseTripQueryResponse";
import {buildTripQueryRequest} from "./buildTripQueryRequest";
import {
  ChangeDatetime, ChangeTimeTarget,
  OriginFocus, DestinationFocus, NoFocus,
  OriginAddressChange, OriginCoordsChange, DestinationAddressChange, DestinationCoordsChange,
  OriginStartFetch, OriginStopFetch, DestinationStartFetch, DestinationStopFetch
} from "../reservation-search/store/search.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../store/reducer";
import {Coords} from "../shared/coords";
import { addMinutes } from "../shared/timeHelperFunctions/addMinutes";
import { subtractMinutes } from "../shared/timeHelperFunctions/subtractMinutes";
import { addDay } from "../shared/timeHelperFunctions/addDay";
import {subtractDay} from "../shared/timeHelperFunctions/subtractDay";


@Injectable()
export class SearchService {
  originInputRef: ElementRef;
  destinationInputRef: ElementRef;

  constructor(
    private store: Store<AppState>,
    private mapService: MapService,
    private fitboundsService: FitboundsService,
    private http: HttpClient
  ) { }

  searchResultReceived() {
    // this.ngRedux.dispatch({ type: SEARCH_RESULT_RECEIVED });
  }

  searchErrorReceived() {
    // this.ngRedux.dispatch({ type: SEARCH_ERROR_RECEIVED });
  }

  searchBookReserv() {
    // this.ngRedux.dispatch({ type: SEARCH_BOOK_RESERV });
  }

  searchConfirmBook() {
    // this.ngRedux.dispatch({ type: SEARCH_CONFIRM_BOOK });

    // successful reservation booking

    setTimeout(() => {
      // this.ngRedux.dispatch({ type: SEARCH_RESERV_BOOKED });

    }, 1000)

    // error

    // setTimeout(() => {
    //   this.ngRedux.dispatch({ type: SEARCH_RESERV_ERROR });
    // }, 1000)
  }


  searchBackOneStep() {
    // this.ngRedux.dispatch({ type: SEARCH_BACK_ONE_STEP });
  }

  searchReset() {
    // this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CLEAR });
    // this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CLEAR });
    // this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.LEAVE_NOW });
    // this.ngRedux.dispatch({ type: SEARCH_RESET })
  }

  searchSubmit() {
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
  }

  originClear() {
    this.originChange('', undefined)
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
    this.store.take(1).subscribe(state => {
      const date = state.search.time.time;
      const dateDate = addDay(date);
      this.store.dispatch(new ChangeDatetime(dateDate))
    });
  }

  subtractDay() {
    this.store.take(1).subscribe(state => {
      const date = state.search.time.time;
      const dateDate = subtractDay(date);
      this.store.dispatch(new ChangeDatetime(dateDate))
    });
  }

  addMinutes(value) {
    this.store.take(1).subscribe(state => {
      const time = state.search.time.time;
      const newTime = addMinutes(time, value);
      this.store.dispatch(new ChangeDatetime(newTime))
    });
  }

  subractMinutes(value) {
    this.store.take(1).subscribe(state => {
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
    this.store.take(1).subscribe(state => {
      if (state.search.origin.address.length === 0) {
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
    this.store.take(1).subscribe(state => {
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
