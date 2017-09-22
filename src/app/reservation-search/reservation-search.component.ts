import { Component, } from '@angular/core';

@Component({
  selector: 'app-reservation-search',
  template: `
    <app-search-container></app-search-container>
    <app-map-container></app-map-container>
  `,
  styles: [``]
})
export class ReservationSearchComponent {
  constructor() { }

}

