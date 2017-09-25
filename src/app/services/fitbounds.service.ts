import { Injectable } from '@angular/core';
import { MapService} from './map.service';

import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {MapSetCenter, MapSetZoomlevel} from '../home/store/search.actions';
import {Observable} from 'rxjs/Observable';
import {Coords} from '../shared/coords';

@Injectable()
export class FitboundsService {
  TILE_SIZE = { height: 256, width: 256 }; // google World tile size, as of v3.22
  ZOOM_MAX = 14;
  BUFFER = 15; // edge buffer for fitting markers within viewport bounds // TODO: does this need to be bigger?

  mapOffset = {x: 330, y: 0}; // width of search panel

  constructor(
    private mapService: MapService,
    private store: Store<AppState>
  ) { }

  update() {
    this.getBounds()
      .map(bounds => {
        const newCenter = this.getNewOffsetCenter(bounds.getCenter());
        this.store.dispatch(new MapSetCenter(newCenter));
        return bounds;
      })
      .map(bounds => {
        const newZoomLevel = this.getNewZoomLevel(bounds);
        this.store.dispatch(new MapSetZoomlevel(newZoomLevel));
      })
      .take(1)
      .subscribe();
  }

  getBounds(): Observable<google.maps.LatLngBounds> {
    return this.store.take(1).map(state => {
      const newBounds = new google.maps.LatLngBounds();
      if (state.search.origin.coords) {
        newBounds.extend(state.search.origin.coords);
      }
      if (state.search.destination.coords) {
        newBounds.extend(state.search.destination.coords);
      }
      if (state.search.result.response) {
        newBounds.extend({
          lat: state.search.result.response.station1Coords.lat,
          lng: state.search.result.response.station1Coords.lng
        });
        newBounds.extend({
          lat: state.search.result.response.station2Coords.lat,
          lng: state.search.result.response.station2Coords.lng });
      }
      return newBounds;
    });
  }

  getNewOffsetCenter(latlng: google.maps.LatLng): Coords {
    const newCenterLatLng = this.offsetLatLng(latlng, this.mapOffset.x / 2, this.mapOffset.y / 2);
    return {
      lat: newCenterLatLng.lat(),
      lng: newCenterLatLng.lng()
    };
  };

  getNewZoomLevel(bounds: google.maps.LatLngBounds): number {
    const offsetWidth = this.mapService.map.getDiv().offsetWidth;
    const offsetHeight = this.mapService.map.getDiv().offsetHeight;
    const dimensions = {
      width: offsetWidth - this.mapOffset.x - this.BUFFER * 2,
      height: offsetHeight - this.mapOffset.y - this.BUFFER * 2
    };
    return this.getBoundsZoomLevel(bounds, dimensions);
  };

  getBoundsZoomLevel(bounds, dimensions): number {
    const latRadian = lat => {
      const sin = Math.sin(lat * Math.PI / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    };
    const zoom = (mapPx, worldPx, fraction) => {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    };
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const latFraction = (latRadian(ne.lat()) - latRadian(sw.lat())) / Math.PI;
    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    const latZoom = zoom(dimensions.height, this.TILE_SIZE.height, latFraction);
    const lngZoom = zoom(dimensions.width, this.TILE_SIZE.width, lngFraction);
    return Math.min(latZoom, lngZoom, this.ZOOM_MAX);
  };

  offsetLatLng(latlng, offsetX, offsetY) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    const scale = Math.pow(2, this.mapService.map.getZoom());
    const point = this.mapService.map.getProjection().fromLatLngToPoint(latlng);
    const pixelOffset = new google.maps.Point((offsetX / scale), (offsetY / scale));
    const newPoint = new google.maps.Point(
      point.x - pixelOffset.x,
      point.y + pixelOffset.y
    );
    return this.mapService.map.getProjection().fromPointToLatLng(newPoint);
  };
}
