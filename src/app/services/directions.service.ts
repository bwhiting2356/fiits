import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { MapsAPILoader } from '@agm/core';

@Injectable()
export class DirectionsService {

  directionsService: google.maps.DirectionsService;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private mapsAPILoader: MapsAPILoader,
  ) {
    this.mapsAPILoader.load().then(() => {
      this.directionsService = new google.maps.DirectionsService();
    });
  }

  directionsPlaceholder() {
    const origin = this.ngRedux.getState().searchOrigin;
    const destination = this.ngRedux.getState().searchDestination;

    if (origin.coords && destination.coords) {
      const request: google.maps.DirectionsRequest = {
        origin: origin.coords,
        destination: destination.coords,
        travelMode: google.maps.TravelMode.BICYCLING
      };
      this.directionsService.route(request, (result) => {
        console.log(result);
      })
    }

  }

}
