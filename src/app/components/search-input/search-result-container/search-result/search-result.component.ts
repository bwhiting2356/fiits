import { Component, Input } from '@angular/core';

import { TripQueryResponse } from '../../../../shared/tripqueryresponse.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  @Input() searchResult: TripQueryResponse;

  get totalPrice() {
    return (
      this.searchResult.station1ReservationPrice +
      this.searchResult.station2ReservationPrice +
      this.searchResult.bikeRentalPrice
    );
  }

  constructor() { }

}
