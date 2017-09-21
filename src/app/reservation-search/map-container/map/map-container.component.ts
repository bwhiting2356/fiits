import { Component } from '@angular/core';

import { ReverseGeocodeService } from '../../../services/reverse-geocode.service';

import {
  findSearchOriginLat,
  findSearchOriginLng,
  findSearchDestinationLat,
  findSearchDestinationLng,
  findStation1Lat,
  findStation1Lng,
  findStation2Lat,
  findStation2Lng, findWalkingPoints1, findBicyclePoints, findWalkingPoints2
} from '../../../redux/selectHelperFunctions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { Observable } from 'rxjs/Observable';
import { Coords } from '../../../shared/coords';
import { TripQueryResponse } from '../../../shared/tripQueryResponse';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent {
  mapZoomLevel: Observable<number>;
  mapCenter: Observable<Coords>;
  origin: Observable<Coords>;
  destination: Observable<Coords>;
  response: Observable<TripQueryResponse>;

  originMarkerDragEnd($event) {
    this.reverseGeocodeService.originMarkerDragEnd($event);
  }

  destinationMarkerDragEnd($event) {
    this.reverseGeocodeService.destinationMarkerDragEnd($event);
  }

  constructor(
    private reverseGeocodeService: ReverseGeocodeService,
    private store: Store<AppState>
  ) {
    this.mapZoomLevel = this.store.select('search').map(search => search.map.zoomLevel);
    this.mapCenter = this.store.select('search').map(search => search.map.center);
    this.origin = this.store.select('search').map(search => search.origin.coords);
    this.destination = this.store.select('search').map(search => search.destination.coords);
    this.response = this.store.select('search').map(search => search.result.response);
  }
}
