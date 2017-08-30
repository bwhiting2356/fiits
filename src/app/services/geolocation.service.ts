import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { } from 'googlemaps';

import { IAppState } from '../redux/store';
import { Place } from '../models/place.model';
import { SEARCH_ORIGIN_CHANGE, SEARCH_ORIGIN_SHOW_X } from '../redux/actions';
import { ReverseGeocodeService } from './reverse-geocode.service';

@Injectable()
export class GeolocationService {

  constructor(
    private reverseGeocodeService: ReverseGeocodeService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  dispatchPosition(position) {
    const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
    this.reverseGeocodeService.geocode(coords).subscribe(address => {
      const origin: Place = {
        name: address,
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      };
      this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CHANGE, body: origin});
      this.ngRedux.dispatch({ type: SEARCH_ORIGIN_SHOW_X });
    });
  }

  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.dispatchPosition.bind(this));
    }
  }
}
