import {AfterViewInit, Component, OnInit} from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { } from 'googlemaps';

import { IAppState } from '../../redux/store';
import { Place } from '../../shared/place.model';
import { GeolocationService } from '../../services/geolocation.service';
import { ReverseGeocodeService } from '../../services/reverse-geocode.service';
import { SEARCH_ORIGIN_CHANGE, SEARCH_DESTINATION_CHANGE } from '../../redux/actions';

import {
  findSearchOriginLat,
  findSearchOriginLng,
  findSearchDestinationLat,
  findSearchDestinationLng
} from '../../redux/selectFunctions';
import { searchParametersChanged } from '../../redux/actionCreators';
import { DirectionsService } from '../../services/directions.service';
import { MapService } from '../../services/map.service';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent {
  @select(findSearchOriginLat) searchOriginLat;
  @select(findSearchOriginLng) searchOriginLng;
  @select(findSearchDestinationLat) searchDestinationLat;
  @select(findSearchDestinationLng) searchDestinationLng;
  @select() mapBounds;



  // TODO: fit bounds and zoom to markers according to advice in this blog post:
      // https://reonomy.com/blog/post/offsetting-bounds-and-zoom-on-a-google-map

  // TODO: figure out TSLint whitespace stuff

  originMarkerDragEnd($event) {
    this.reverseGeocodeService.geocode($event.coords).subscribe(address => {
      const newOrigin: Place = {
        name: address,
        coords: $event.coords
      };
      this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CHANGE, body: newOrigin});
      this.ngRedux.dispatch(searchParametersChanged());
    });
  }

  destinationMarkerDragEnd($event) {
    console.log($event.coords);
    this.reverseGeocodeService.geocode($event.coords).subscribe(address => {
      const newDestination: Place = {
        name: address,
        coords: $event.coords
      };
      this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CHANGE, body: newDestination});
      this.ngRedux.dispatch(searchParametersChanged());
    });
  }

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private geolocationService: GeolocationService,
    private reverseGeocodeService: ReverseGeocodeService,
    private directionsService: DirectionsService,
    private _loader: MapsAPILoader,
    // private mapService: MapService,
    private _wrapper: GoogleMapsAPIWrapper
  ) {

  }


  //
  // ngOnInit() {
  //   this.geolocationService.getCurrentPosition();
  //   console.log('inside ng on init map container');
  //   let a = this.mapService.getMap().then(result => {
  //     console.log('inside the promise')
  //     const map = result;
  //     console.log(map);
  //   });
  //   console.log(a);
  // }
}
