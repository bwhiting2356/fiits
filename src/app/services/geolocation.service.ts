import { Injectable } from '@angular/core';
import { SearchService } from './search.service';
import { MapService } from './map.service';

@Injectable()
export class GeolocationService {

  constructor(
    private searchService: SearchService,
    private mapService: MapService
  ) { }

  getCurrentPosition() {
    if (navigator.geolocation) {
      this.mapService.startRendering();
      this.searchService.originAddressStartFetch();
      navigator.geolocation.getCurrentPosition((position) => {
        this.dispatchPosition(position);
      });
    }
  }

  dispatchPosition(position) {
    const address = 'Current Location';
    const coords = { lat: position.coords.latitude, lng: position.coords.longitude };

    this.searchService.originNewLocation(address, coords);
    this.searchService.originAddressStopFetch();
    this.searchService.updateInputFocus();
    this.mapService.stopRendering();
  }
}
