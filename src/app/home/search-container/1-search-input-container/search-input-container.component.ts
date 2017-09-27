import { Component } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search-input-container',
  template: `
    <form class="input-form" (onSubmit)="searchSubmit()">
      <app-origin-input></app-origin-input>
      <app-switch-inputs></app-switch-inputs>
      <app-destination-input></app-destination-input>
      <app-date-time-input></app-date-time-input>
      <button
        type="button"
        class="btn btn-primary bike-reservation-search"
        (click)="searchSubmit()"
        [disabled]="disabled | async">Find Bike Reservations</button>
    </form>
  `,
  styleUrls: ['./search-input-container.component.scss']
})
export class SearchInputContainerComponent {
  disabled: Observable<boolean>;

  searchSubmit() {
    this.searchService.searchSubmit();
  }

  constructor(
    private searchService: SearchService,
    private store: Store<AppState>
  ) {
    this.disabled = this.store.select('search').map(search => {
      return Boolean(!(search.origin.address && search.destination.address));
    });
  }

}
