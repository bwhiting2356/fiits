import { Component } from '@angular/core';
import { select } from '@angular-redux/store';

import { ReverseGeocodeService } from '../../services/reverse-geocode.service';

import {
  findSearchOriginLat,
  findSearchOriginLng,
  findSearchDestinationLat,
  findSearchDestinationLng
} from '../../redux/selectHelperFunctions';

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
