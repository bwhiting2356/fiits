import { Component } from '@angular/core';
import { select } from '@angular-redux/store';

import { ReverseGeocodeService } from '../../services/reverse-geocode.service';

import {
  findSearchOriginLat,
  findSearchOriginLng,
  findSearchDestinationLat,
  findSearchDestinationLng,
  findStation1Lat,
  findStation1Lng,
  findStation2Lat,
  findStation2Lng
} from '../../redux/selectHelperFunctions';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent {
  @select(findSearchOriginLat) searchOriginLat;
  @select(findSearchOriginLng) searchOriginLng;
  @select(findSearchDestinationLat) searchDestinationLat;
  @select(findSearchDestinationLng) searchDestinationLng;
  @select(findStation1Lat) station1Lat;
  @select(findStation1Lng) station1Lng;
  @select(findStation2Lat) station2Lat;
  @select(findStation2Lng) station2Lng;
  @select() mapBounds;
  @select() mapZoomLevel;
  @select() mapCenterLat;
  @select() mapCenterLng;

  points = [
    {
      lat: 40.694970,
      lng: -73.946238
    },
    {
      lat: 40.693725,
      lng: -73.946957
    }
  ]

  // TODO: fit bounds and zoom to markers according to advice in this blog post:
      // https://reonomy.com/blog/post/offsetting-bounds-and-zoom-on-a-google-map

  originMarkerDragEnd($event) {
    this.reverseGeocodeService.originMarkerDragEnd($event);
  }

  destinationMarkerDragEnd($event) {
    this.reverseGeocodeService.destinationMarkerDragEnd($event);
  }

  constructor(
    private reverseGeocodeService: ReverseGeocodeService,
  ) { }
}
