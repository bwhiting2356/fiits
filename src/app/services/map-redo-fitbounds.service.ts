import { Injectable } from '@angular/core';
import {MapService} from "./map.service";
import {NgRedux} from "@angular-redux/store";
import {IAppState} from "../redux/store";

interface MapDimensions {
  height: number,
  width: number
}

@Injectable()
export class MapRedoFitboundsService {
  TILE_SIZE = { height: 256, width: 256 }; // google World tile size, as of v3.22
  ZOOM_MAX = 21; // max google maps zoom level, as of v3.22
  BUFFER = 15; // edge buffer for fitting markers within viewport bounds

  mapDimensions: MapDimensions = {
    height: undefined,
    width: undefined
  };

  mapOffset = {x: 0, y: 0};

  constructor(
    private mapService: MapService,
    private ngRedux: NgRedux<IAppState>
  ) { }

    // const mapOptions = {
    //   zoom: 14,
    //   center: {lat: 34.075328,lng: -118.330432},
    //   options: {
    //     mapTypeControl: false
    //   }
    // };
    // const markers = [];
  get mapEl() {
    return this.mapService.map.getDiv()
  }
  get gmap() {
    return this.mapService.map
  }

    // const overlayEl = document.getElementById('overlay');
    // const gmap = new google.maps.Map(mapEl, mapOptions);

  updateMapDimensions() {
    this.mapDimensions.height = this.mapEl.offsetHeight;
    this.mapDimensions.width = this.mapEl.offsetWidth;
  }

  getBoundsZoomLevel(bounds, dimensions) {
    console.log('line 53');
    const latRadian = lat => {
      const sin = Math.sin(lat * Math.PI / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    };
    const zoom = (mapPx, worldPx, fraction) => {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    };
    console.log('bounds', bounds);
    const ne = bounds.getNorthEast();
    console.log('ne', ne.lat)
    const sw = bounds.getSouthWest();
    const latFraction = (latRadian(ne.lat()) - latRadian(sw.lat())) / Math.PI;
    console.log("latFraction", latFraction)
    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
    console.log('line 68')

    const latZoom = zoom(dimensions.height, this.TILE_SIZE.height, latFraction);
    console.log(latZoom);
    const lngZoom = zoom(dimensions.width, this.TILE_SIZE.width, lngFraction);

    return Math.min(latZoom, lngZoom, this.ZOOM_MAX);
  };

  getBounds(locations) {
    console.log(locations);
    let northeastLat;
    let northeastLong;
    let southwestLat;
    let southwestLong;
    locations.forEach(function(location){
      if (!northeastLat) {
        northeastLat = southwestLat = location.lat;
        southwestLong = northeastLong = location.lng;
        return;
      }
      if (location.lat > northeastLat) {
        northeastLat = location.lat;
      } else if (location.lat < southwestLat) {
        southwestLat = location.lat;
      }
      if (location.lng < northeastLong) {
        northeastLong = location.lng;
      } else if (location.lng > southwestLong) {
        southwestLong = location.lng;
      }
    });
    const northeast = new google.maps.LatLng(northeastLat, northeastLong);
    const southwest = new google.maps.LatLng(southwestLat, southwestLong);
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(northeast);
    bounds.extend(southwest);
    return bounds;
  };

  zoomWithOffset(shouldZoom) {
    const currentzoom = this.gmap.getZoom();
    const newzoom = shouldZoom ? currentzoom + 1 : currentzoom - 1;
    const offset = {
      x: shouldZoom ? -this.mapOffset.x / 4 : this.mapOffset.x / 2,
      y: shouldZoom ? -this.mapOffset.y / 4 : this.mapOffset.y / 2
    };
    const newCenter = this.offsetLatLng(this.gmap.getCenter(), offset.x, offset.y);
    if (shouldZoom) {
      this.gmap.setZoom(newzoom);
      this.gmap.panTo(newCenter);
    } else {
      this.gmap.setCenter(newCenter);
      this.gmap.setZoom(newzoom);
    }
  };

  setMapBounds() {
    console.log('yup')
    const locations = this.getLocations();
    this.updateMapDimensions();
    const bounds = this.getRealBounds();
    console.log('bounds')
    console.log(bounds)
    const dimensions = {
      width: this.mapDimensions.width - this.mapOffset.x - this.BUFFER * 2,
      height: this.mapDimensions.height - this.mapOffset.y - this.BUFFER * 2
    };
    const zoomLevel = this.getBoundsZoomLevel(bounds, dimensions);
    console.log(zoomLevel);
    // this.mapService.map.setZoom(zoomLevel);
    // this.setOffsetCenter(bounds.getCenter());
  };

  offsetLatLng(latlng, offsetX, offsetY) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    const scale = Math.pow(2, this.gmap.getZoom());
    const point = this.gmap.getProjection().fromLatLngToPoint(latlng);
    const pixelOffset = new google.maps.Point((offsetX / scale), (offsetY / scale));
    const newPoint = new google.maps.Point(
      point.x - pixelOffset.x,
      point.y + pixelOffset.y
    );
    return this.gmap.getProjection().fromPointToLatLng(newPoint);
  };

  setOffsetCenter(latlng) {
    const newCenterLatLng = this.offsetLatLng(latlng, this.mapOffset.x / 2, this.mapOffset.y / 2);
    this.gmap.panTo(newCenterLatLng);
  };

  getRealBounds() {
    const newBounds = new google.maps.LatLngBounds();
    const state = this.ngRedux.getState();
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
    return newBounds;
  }

  getLocations() {
    const state = this.ngRedux.getState();
    const locations = [];
    if (state.searchOrigin) {
      locations.push(state.searchOrigin);
    }
    if (state.searchDestination) {
      locations.push(state.searchDestination);
    }
    if (state.searchResult) {
      locations.push(state.searchResult.station1Location);
      locations.push(state.searchResult.station2Location);
    }
    return locations;
  }
}
