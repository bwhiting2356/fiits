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
  findStation2Lng, findWalkingPoints1, findBicyclePoints, findWalkingPoints2
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
  @select() mapZoomLevel;
  @select() mapCenterLat;
  @select() mapCenterLng;
  @select(findWalkingPoints1) walkingPoints1;
  @select(findWalkingPoints2) walkingPoints2;
  @select(findBicyclePoints) bicyclePoints;

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
