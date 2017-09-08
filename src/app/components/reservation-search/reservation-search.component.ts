import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-reservation-search',
  template: `
    <app-progress></app-progress>
    <div [ngSwitch]="searchProgress | async">
      <app-search-input-container *ngSwitchCase="'noSearch'"></app-search-input-container>
      <app-search-loader *ngSwitchCase="'searchSubmitted'"></app-search-loader>
      <app-search-result *ngSwitchCase="'resultReceived'" [searchResult]="searchResult | async"></app-search-result>
    </div>
    <!--resultReceived: 'resultReceived',-->
  `,
  styles: [`
    :host {
      position: fixed;
      z-index: 2;
      top: 10px;
      left: 10px;
      width: 320px;
      border: 1px solid grey;
      border-radius: 3px;
      padding: 5px;
      background: white;
    }
  `]
})
export class ReservationSearchComponent implements OnInit {
  @select() searchProgress;
  @select() searchResult;
  constructor(
    private geolocationService: GeolocationService) {}

  ngOnInit() {
    this.geolocationService.getCurrentPosition();
  };
}

