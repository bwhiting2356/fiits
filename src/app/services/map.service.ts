import { Injectable, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import { Coords } from '../shared/coords.model';

@Injectable()
export class MapService implements OnInit {
  directionsService;
  directionsDisplayWalking1;
  directionsDisplayBicycle;
  directionsDisplayWalking2;


  constructor(
    // private googleMapsApiWrapper: GoogleMapsAPIWrapper
    private mapsAPILoader: MapsAPILoader
  ) {
    console.log('this happened');
    this.mapsAPILoader.load().then(() => {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplayWalking1 = new google.maps.DirectionsRenderer();
      this.directionsDisplayBicycle = new google.maps.DirectionsRenderer();
      this.directionsDisplayWalking2 = new google.maps.DirectionsRenderer();
    });

  }

  ngOnInit() {
    // this.mapsAPILoader.load().then(() => {
    //   // this.directionsService = new google.maps.DirectionsService();
    //   // this.directionsDisplay = new google.maps.DirectionsRenderer();
    // });
    // console.log('this happened');

  }

  renderWalking1Directions(origin: Coords, destination: Coords) {
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplayWalking1.setDirections(result);
      }
    });
  }

  // TODO: put some opacity layer and a spinner over the map while the directions are loading ( need three different fetching states and set them to true inside promise

  renderWalking2Directions(origin: Coords, destination: Coords) {
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplayWalking2.setDirections(result);
      }
    });
  }

  renderBikeDirections(origin: Coords, destination: Coords) {
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.BICYCLING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplayBicycle.setDirections(result);
      }
    });
  }
}
