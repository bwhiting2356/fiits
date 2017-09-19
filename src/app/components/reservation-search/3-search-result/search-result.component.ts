import { Component, Input } from '@angular/core';

import { TripQueryResponse } from '../../../shared/tripQueryResponse';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  @Input() searchResult: TripQueryResponse;

  get totalPrice() {
    return (
      this.searchResult.reservation1Price +
      this.searchResult.reservation2Price +
      this.searchResult.bicyclingPrice
    );
  }

  bookReservation() {
    this.searchService.searchBookReserv();
  }

  constructor(
    private searchService: SearchService
  ) { }

}
