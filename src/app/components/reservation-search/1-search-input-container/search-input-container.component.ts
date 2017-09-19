import { Component } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { NgRedux } from '@angular-redux/store';
import {IAppState} from "../../../redux/IAppState";

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
        [disabled]="disabled">Find Bike Reservations</button>
    </form>
  `,
  styleUrls: ['search-input-container.component.scss']
})
export class SearchInputContainerComponent {
  get disabled() {
    const state = this.ngRedux.getState();
    return !(state.searchOriginAddress && state.searchDestinationAddress);
  }
  searchSubmit() {
    this.searchService.searchSubmit();
  }

  constructor(
    private searchService: SearchService,
    private ngRedux: NgRedux<IAppState>
  ) { }

}
