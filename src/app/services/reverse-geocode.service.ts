import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';

import { Coords } from '../shared/coords';
import { SearchService } from 'app/services/search.service';
import { Place } from '../shared/place';

@Injectable()
export class ReverseGeocodeService {

  geocoder: google.maps.Geocoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private searchService: SearchService
  ) {
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  originMarkerDragEnd($event) {
    this.searchService.originAddressStartFetch();
    this.searchService.searchOriginAddressTempClear();

    this.geocode($event.coords).subscribe((address: string) => {

      this.searchService.originChange(address, $event.coords);
      this.searchService.originAddressStopFetch();
    });
  }

  destinationMarkerDragEnd($event) {
    this.searchService.searchDestinationAddressStartFetch();
    this.searchService.searchDestinationAddressTempClear();

    this.geocode($event.coords).subscribe((address: string) => {
      this.searchService.destinationChange(address, $event.coords);
      this.searchService.searchDestinationAddressStopFetch();
    });
  }
  geocode(request: Coords | String): Observable<String> {
    let geocoderRequest;
    if (typeof(request) === 'string') {
      geocoderRequest = { 'address': request }
    } else {
      geocoderRequest = { 'location': request  }
    }
    return new Observable((observer: Observer<String>) => {
      this.geocoder.geocode(geocoderRequest, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK) {
            observer.next(results[0].formatted_address);
            observer.complete();
          } else {
            observer.error(status);
          }
        }
      ))
    })
  }
}
