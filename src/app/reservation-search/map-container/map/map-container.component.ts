import { Component } from '@angular/core';

import { styles } from './styles';

import { ReverseGeocodeService } from '../../../services/reverse-geocode.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { Observable } from 'rxjs/Observable';
import { Coords } from '../../../shared/coords';
import { TripQueryResponse } from '../../../shared/tripQueryResponse';
import {SearchService} from "../../../services/search.service";

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
  styles = styles;

  originMarkerDragEnd($event) {
    this.reverseGeocodeService.originMarkerDragEnd($event);
    // TODO: don't let markers be draggable if directions are displaying
  }

  destinationMarkerDragEnd($event) {
    this.reverseGeocodeService.destinationMarkerDragEnd($event);
    // TODO: don't let markers be draggable if directions are displaying
  }

  constructor(
    private reverseGeocodeService: ReverseGeocodeService,
    private searchService: SearchService,
    private store: Store<AppState>
  ) {
    this.mapZoomLevel = this.store.select('search').map(search => search.map.zoomLevel);
    this.mapCenter = this.store.select('search').map(search => search.map.center);
    this.origin = this.store.select('search').map(search => search.origin.coords);
    this.destination = this.store.select('search').map(search => search.destination.coords);
    this.response = this.store.select('search').map(search => search.result.response);
  }
}
