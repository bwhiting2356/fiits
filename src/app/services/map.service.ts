import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

import { Coords } from '../shared/coords';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { MAP_RENDERING_START, MAP_RENDERING_STOP } from '../redux/actions';

@Injectable()
export class MapService {
  directionsService;
  walking1Polyline: google.maps.Polyline;
  walking2Polyline: google.maps.Polyline;
  bicyclePolyline: google.maps.Polyline;
  map;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngRedux: NgRedux<IAppState>,
  ) {
    this.mapsAPILoader.load().then(() => {
      this.directionsService = new google.maps.DirectionsService();
    });
  }

  initializeMapFromMapExtension(map) {
    this.map = map;
  }

  startRendering() {
    this.ngRedux.dispatch({ type: MAP_RENDERING_START });
  }

  stopRendering() {
    this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });
  }

  addWalking1Directions(origin: Coords, destination: Coords) {
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const points = result.routes[0].overview_path;
        this.walking1Polyline = this.createWalkingPolyline(points);
        this.walking1Polyline.setMap(this.map);
      }
    });
  }

  addWalking2Directions(origin: Coords, destination: Coords) {
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const points = result.routes[0].overview_path;
        this.walking2Polyline = this.createWalkingPolyline(points);
        this.walking2Polyline.setMap(this.map);
      }
    });
  }

  addBikeDirections(origin: Coords, destination: Coords) {
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.BICYCLING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const points = result.routes[0].overview_path;
        this.bicyclePolyline = this.createBicyclingPolyline(points);
        this.bicyclePolyline.setMap(this.map);
      }
    });
  }

  removePolylines() {
    if (this.walking1Polyline && this.walking2Polyline && this.bicyclePolyline) {
      this.walking1Polyline.setMap(null);
      this.walking2Polyline.setMap(null);
      this.bicyclePolyline.setMap(null);
    }
  }

  createWalkingPolyline(points) {
    const walkingLineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      fillOpacity: 1,
      scale: 3
    };

    const walkingPathLine = new google.maps.Polyline({
      path: points,
      geodesic: true,
      strokeColor: 'blue',
      strokeOpacity: 0,
      strokeWeight: 2,
      zIndex: 1,
      icons: [{
        icon: walkingLineSymbol,
        offset: '0',
        repeat: '10px'
      }],
    });

    return walkingPathLine;
  }

  createBicyclingPolyline(points) {
    const bicyclePathLine = new google.maps.Polyline({
      path: points,
      strokeColor: '#FF0000',
      strokeOpacity: 1,
      zIndex: 0,
    });

    return bicyclePathLine;
  }
}
