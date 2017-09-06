import { Injectable } from '@angular/core';
import { MapService} from './map.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState} from '../redux/store';
import { MAP_SET_CENTER, MAP_SET_ZOOMLEVEL} from '../redux/actions';

@Injectable()
export class FitboundsService {
  TILE_SIZE = { height: 256, width: 256 }; // google World tile size, as of v3.22
  ZOOM_MAX = 21; // max google maps zoom level, as of v3.22
  BUFFER = 15; // edge buffer for fitting markers within viewport bounds

  mapDimensions = {
    height: undefined,
    width: undefined
  };

  mapOffset = {x: 340, y: 0}; // width of search panel

  constructor(
    private mapService: MapService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  get mapEl() {
    return this.mapService.map.getDiv()
  }
  get gmap() {
    return this.mapService.map
  }

  updateMapDimensions() {
    this.mapDimensions.height = this.mapEl.offsetHeight;
    this.mapDimensions.width = this.mapEl.offsetWidth;
  }

  // TODO: refactor without updateMapDimensions or mapDimensions - just grab the property off the map object

  getBoundsZoomLevel(bounds, dimensions) {
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

  setMapBounds() {
    this.updateMapDimensions();
    const bounds = this.getBounds();
    const dimensions = {
      width: this.mapDimensions.width - this.mapOffset.x - this.BUFFER * 2,
      height: this.mapDimensions.height - this.mapOffset.y - this.BUFFER * 2
    };
    const zoomLevel = this.getBoundsZoomLevel(bounds, dimensions);
    this.ngRedux.dispatch({type: MAP_SET_ZOOMLEVEL, body: zoomLevel });
    this.setOffsetCenter(bounds.getCenter());
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
    this.ngRedux.dispatch({
      type: MAP_SET_CENTER,
      body: {
        lat: newCenterLatLng.lat(),
        lng: newCenterLatLng.lng()
      }
    });
  };

  getBounds() {
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
    // TODO: figure out why it's not fitting the bounds correctly until after the server response
    return newBounds;
  }
}
