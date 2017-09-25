import { Component, Input } from '@angular/core';

import { TripQueryResponse } from '../../../shared/tripQueryResponse';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  @Input() response: TripQueryResponse;

  get totalPrice() {
    return (
      this.response.reservation1Price +
      this.response.reservation2Price +
      this.response.bicyclingPrice
    );
  }

  bookReservation() {
    this.searchService.searchBookReserv();
  }

  constructor(
    private searchService: SearchService,
  ) { }

}
