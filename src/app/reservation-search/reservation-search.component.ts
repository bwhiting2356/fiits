import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-reservation-search',
  template: `
    <app-search-container></app-search-container>
    <app-map-container></app-map-container>
  `,
  styles: [``]
})
export class ReservationSearchComponent implements OnInit {
  constructor(
    private geolocationService: GeolocationService,
  ) { }
  ngOnInit() {
    this.geolocationService.getCurrentPosition();
  }

}

