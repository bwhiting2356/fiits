import { Component } from '@angular/core';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-info',
  template: `
    <app-search-navigate></app-search-navigate>
    <div>
      Here is the info you need to read before you can rent a bike.
    </div>
    <button
      type="button"
      class="btn btn-primary bike-reservation-confirm"
      (click)="confirmBook()">
      Confirm Booking
    </button>
  `,
  styleUrls: ['./search-info.component.css']
})
export class SearchInfoComponent {

  confirmBook() {
    this.searchService.confirmBook()
  }

  constructor(private searchService: SearchService ) { }
}
