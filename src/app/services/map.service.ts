import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
// import { Point } from '@agm/core/services/google-maps-types'

import { Coords } from '../shared/coords.model';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';

const TILE_SIZE = { height: 256, width: 256 }; // google World tile size, as of v3.22
const ZOOM_MAX = 21; // max google maps zoom level, as of v3.22
const BUFFER = 15; // edge buffer for fitting markers within viewport bounds
const mapOffset = { x: 0, y: 0 };

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

  // offset map bounds

  offsetLatLng(latlng, offsetX, offsetY) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    const scale = Math.pow(2, this.map.getZoom());
    const point = this.map.getProjection().fromLatLngToPoint(latlng);
    const pixelOffset = { x: (offsetX / scale), y: (offsetY / scale) };
    const newPoint = {
      x: (point.x - pixelOffset.x),
      y: (point.y + pixelOffset.y)
    };
    return this.map.getProjection().fromPointToLatLng(newPoint);
  };

  zoomWithOffset(shouldZoom) {
    const currentzoom = this.map.getZoom();
    const newzoom = shouldZoom ? currentzoom + 1 : currentzoom - 1;
    const offset = {
      x: shouldZoom ? -mapOffset.x / 4 : mapOffset.x / 2,
      y: shouldZoom ? -mapOffset.y / 4 : mapOffset.y / 2
    };
    const newCenter = this.offsetLatLng(this.map.getCenter(), offset.x, offset.y);
    if(shouldZoom){
      this.map.setZoom(newzoom);
      this.map.setCenter(newCenter);
    } else {
      this.map.setCenter(newCenter);
      this.map.setZoom(newzoom);
    }
  };

  getBoundsZoomLevel(bounds, dimensions) {
    const latRadian = lat => {
      const sin = Math.sin(lat * Math.PI / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), - Math.PI) / 2;
    };
    const zoom = (mapPx, worldPx, fraction) => {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    };
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const latFraction = (latRadian(ne.lat()) - latRadian(sw.lat())) / Math.PI;
    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
    const latZoom = zoom(dimensions.height, TILE_SIZE.height, latFraction);
    const lngZoom = zoom(dimensions.width, TILE_SIZE.width, lngFraction);
    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  };

  get mapDimensionHeight() {
    return this.map.getDiv().offsetHeight;
  }

  get mapDimensionWidth() {
    return this.map.getDiv().offsetWeight;
  }

  setOffsetCenter(latlng) {
    const newCenterLatLng = this.offsetLatLng(
      latlng,
      mapOffset.x / 2,
      mapOffset.y / 2);
    this.map.panTo(newCenterLatLng);
  };

  setMapBounds(newBounds) {
    // const bounds = this.getBounds(locations);
    const dimensions = {
      width: this.mapDimensionWidth - mapOffset.x - BUFFER * 2,
      height: this.mapDimensionHeight - mapOffset.y - BUFFER * 2
    };
    const zoomLevel = this.getBoundsZoomLevel(newBounds, dimensions);
    this.map.setZoom(zoomLevel);
    this.setOffsetCenter(newBounds.getCenter());
  };

  redoFitBounds() {
    const newBounds = new google.maps.LatLngBounds();
    const state: IAppState = this.ngRedux.getState();
    if (state.searchOrigin) {
      newBounds.extend(state.searchOrigin.coords);
    }
    if (state.searchDestination) {
      newBounds.extend(state.searchDestination.coords);
    }
    if (state.searchResult) {
      newBounds.extend(state.searchResult.station1Location);
      newBounds.extend(state.searchResult.station2Location);
    }
    this.setMapBounds(newBounds);
  }


}
