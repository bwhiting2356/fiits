import { Injectable, NgZone } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import { Coords } from '../models/coords.model';

@Injectable()
export class ReverseGeocodeService {

  geocoder: google.maps.Geocoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  // TODO: refactor with redux-thunk pattern/best practices with async api call events

  geocode(latLng: Coords): Observable<String> {
    return new Observable((observer: Observer<String>) => {
      this.geocoder.geocode({'location': latLng }, (
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
