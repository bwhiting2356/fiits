import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import {Coords} from "../shared/coords";
import {Polyline, PolylineID} from "../shared/polylines";

@Injectable()
export class PolylineService {
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


  addPolyline(points: Coords[], lineId: PolylineID) {
    if (lineId === Polyline.WALKING_1) {
      this.walking1Polyline = MapService.createWalkingPolyline(points);
      this.walking1Polyline.setMap(this.mapService.map);
      this.walking1PolylineBorder = MapService.createWalkingPolylineBorder(points);
      this.walking1PolylineBorder.setMap(this.mapService.map);
    } else if (lineId === Polyline.WALKING_2) {
      this.walking2Polyline = MapService.createWalkingPolyline(points);
      this.walking2Polyline.setMap(this.mapService.map);
      this.walking2PolylineBorder = MapService.createWalkingPolylineBorder(points);
      this.walking2PolylineBorder.setMap(this.mapService.map);
    } else if (lineId === Polyline.BICYCLING) {
      this.bicyclePolyline = MapService.createBicyclingPolyline(points);
      this.bicyclePolyline.setMap(this.mapService.map);
      this.bicyclePolylineBorder = MapService.createBicyclingPolylineBorder(points);
      this.bicyclePolylineBorder.setMap(this.mapService.map);
    }
  }

  removePolyline(lineId: PolylineID) {
    if (lineId === Polyline.WALKING_1) {
      this.walking1Polyline.setMap(null);
      this.walking1PolylineBorder.setMap(null);
    } else if (lineId === Polyline.WALKING_2) {
      this.walking2Polyline.setMap(null);
      this.walking2PolylineBorder.setMap(null);
    } else if (lineId === Polyline.BICYCLING) {
      this.bicyclePolyline.setMap(null);
      this.bicyclePolylineBorder.setMap(null);
    }
  }

  constructor(
    private mapService: MapService,
  ) { }
}
