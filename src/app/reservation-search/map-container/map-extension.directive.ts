import { AfterViewInit, Directive } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { MapService } from '../../services/map.service';

@Directive({
  selector: '[appMapExtension]'
})
export class MapExtensionDirective implements AfterViewInit {

  constructor(
    private apiWrapper: GoogleMapsAPIWrapper,
    private mapsAPILoader: MapsAPILoader,
    private mapService: MapService
  ) { }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {

      this.apiWrapper.getNativeMap().then((m) => {
        this.mapService.initializeMapFromMapExtension(m);

      }, err => {
        console.log('Error', err );
      });
    });
  }
}
