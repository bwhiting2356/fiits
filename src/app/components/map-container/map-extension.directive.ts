import { AfterViewInit, Directive } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { MapService } from '../../services/map.service';


@Directive({
  selector: '[appMapExtension]'
})
export class MapExtensionDirective implements AfterViewInit {
  directionsService;
  directionsDisplay;

  constructor(
    private apiWrapper: GoogleMapsAPIWrapper,
    private mapsAPILoader: MapsAPILoader,
    private mapService: MapService
  ) { }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();

      this.apiWrapper.getNativeMap().then((m) => {
        this.mapService.directionsDisplayWalking1.setMap(m);
        this.mapService.directionsDisplayWalking1.setOptions( { suppressMarkers: true } );

        this.mapService.directionsDisplayBicycle.setMap(m);
        this.mapService.directionsDisplayBicycle.setOptions( { suppressMarkers: true } );

        this.mapService.directionsDisplayWalking2.setMap(m);
        this.mapService.directionsDisplayWalking2.setOptions( { suppressMarkers: true } );

      }, err => {
        console.log('error', err );
      });
    });
  }
}
