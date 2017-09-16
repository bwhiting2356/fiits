import { Injectable } from '@angular/core';

import { Coords } from '../shared/coords';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { MAP_RENDERING_START, MAP_RENDERING_STOP } from '../redux/actions';
import { Polylines } from '../shared/polylines';

@Injectable()
export class MapService {
  map;
  walking1Polyline: google.maps.Polyline;
  walking1PolylineBorder: google.maps.Polyline;
  walking2Polyline: google.maps.Polyline;
  walking2PolylineBorder: google.maps.Polyline;
  bicyclePolyline: google.maps.Polyline;
  bicyclePolylineBorder: google.maps.Polyline;

  static createWalkingPolyline(points) {
    const walkingLineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      fillOpacity: 1,
      scale: 4
    };

    return new google.maps.Polyline({
      path: points,
      strokeColor: 'white',
      strokeOpacity: 0,
      strokeWeight: 4,
      zIndex: 3,
      icons: [{
        icon: walkingLineSymbol,
        offset: '0',
        repeat: '15px'
      }],
    });
  }

  static createBicyclingPolyline(points) {
    return new google.maps.Polyline({
      path: points,
      strokeColor: '#00B3FD',
      strokeOpacity: 1,
      strokeWeight: 5,
      zIndex: 1,
    });
  }

  static createBicyclingPolylineBorder(points) {
    return new google.maps.Polyline({
      path: points,
      strokeColor: '#3379C3',
      strokeOpacity: 1,
      strokeWeight: 7,
      zIndex: 0,
    });
  }

  static createWalkingPolylineBorder(points) {
    const walkingLineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      fillOpacity: 1,
      scale: 5
    };

    return new google.maps.Polyline({
      path: points,
      // geodesic: true,
      strokeColor: 'black',
      strokeOpacity: 0,
      strokeWeight: 5,
      zIndex: 2,
      icons: [{
        icon: walkingLineSymbol,
        offset: '0',
        repeat: '15px'
      }],
    });
  }

  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) {}

  initializeMapFromMapExtension(map) {
    this.map = map;

    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(this.map);

    // TODO: is there a better place to put this?
    // TODO: should I style this better, soften the bike paths a little?
  }

  startRendering() {
    this.ngRedux.dispatch({ type: MAP_RENDERING_START });
  }

  stopRendering() {
    this.ngRedux.dispatch({ type: MAP_RENDERING_STOP });
  }

  addPolyline(points: Coords[], lineId: string) {
    if (lineId === Polylines.WALKING_1) {
      this.walking1Polyline = MapService.createWalkingPolyline(points);
      this.walking1Polyline.setMap(this.map);
      this.walking1PolylineBorder = MapService.createWalkingPolylineBorder(points);
      this.walking1PolylineBorder.setMap(this.map);
    } else if (lineId === Polylines.WALKING_2) {
      this.walking2Polyline = MapService.createWalkingPolyline(points);
      this.walking2Polyline.setMap(this.map);
      this.walking2PolylineBorder = MapService.createWalkingPolylineBorder(points);
      this.walking2PolylineBorder.setMap(this.map);
    } else if (lineId === Polylines.BICYCLING) {
      this.bicyclePolyline = MapService.createBicyclingPolyline(points);
      this.bicyclePolyline.setMap(this.map);
      this.bicyclePolylineBorder = MapService.createBicyclingPolylineBorder(points);
      this.bicyclePolylineBorder.setMap(this.map);
    }
  }

  removePolyline(lineId: string) {
    if (lineId === Polylines.WALKING_1) {
      this.walking1Polyline.setMap(null);
      this.walking1PolylineBorder.setMap(null);
    } else if (lineId === Polylines.WALKING_2) {
      this.walking2Polyline.setMap(null);
      this.walking2PolylineBorder.setMap(null);
    } else if (lineId === Polylines.BICYCLING) {
      this.bicyclePolyline.setMap(null);
      this.bicyclePolylineBorder.setMap(null);
    }
  }
}
