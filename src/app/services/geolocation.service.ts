import { Injectable } from '@angular/core';

import { Place } from '../shared/place.model';
import { ReverseGeocodeService } from './reverse-geocode.service';
import { SearchService } from './search.service';
import { MapService } from './map.service';

@Injectable()
export class GeolocationService {

  constructor(
    private reverseGeocodeService: ReverseGeocodeService,
    private searchService: SearchService,
    private mapService: MapService
  ) { }

  getCurrentPosition() {
    if (navigator.geolocation) {
      this.searchService.searchOriginHideX();
      this.searchService.searchOriginAddressStartFetch();
      navigator.geolocation.getCurrentPosition((position) => {
        this.dispatchPosition(position);
      });
    }
  }

  dispatchPosition(position) {
    const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
    const origin: Place = {
      name: 'Current Location ',
      coords: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    };

    this.searchService.searchOriginAddressStopFetch();
    this.searchService.searchOriginChange(origin);
    this.searchService.searchOriginShowX();
    this.mapService.stopRendering()
  }
}
