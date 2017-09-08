import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/redux/store';

@Component({
  selector: 'app-search-input-container',
  template: `
    <form class="input-form">
      <app-origin-input></app-origin-input>
      <app-switch-inputs></app-switch-inputs>
      <app-destination-input></app-destination-input>
      <app-date-time-input></app-date-time-input>
      <button
        type="button"
        class="btn btn-primary bike-reservation-search"
        (click)="searchSubmit()"
        [disabled]="!enabled"
      >Find Bike Reservations</button>
    </form>
  `,
  styleUrls: ['search-input-container.component.scss']
})
export class SearchInputContainerComponent implements OnInit {
  get enabled() {
    const state = this.ngRedux.getState();
    return state.searchOrigin && state.searchDestination;
  }
  searchSubmit() {
    this.searchService.searchNavSubmitted()
  }

  constructor(
    private searchService: SearchService,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

}
