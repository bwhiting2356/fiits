import { AfterViewInit, Directive } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { MapService } from '../../../services/map.service';
import { GeolocationService } from '../../../services/geolocation.service';

@Directive({
  selector: '[appMapExtension]'
})
export class MapExtensionDirective implements AfterViewInit {

  constructor(
    private apiWrapper: GoogleMapsAPIWrapper,
    private mapsAPILoader: MapsAPILoader,
    private mapService: MapService,
    private geolocationService: GeolocationService
  ) { }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {

      this.apiWrapper.getNativeMap().then((m) => {
        this.mapService.initializeMapFromMapExtension(m);

      }, err => {
        console.log('Error', err );
      });
    });

    this.geolocationService.getCurrentPosition();
  }
}
