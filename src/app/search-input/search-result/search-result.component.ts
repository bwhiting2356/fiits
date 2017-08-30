import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @select() searchFetching;
  @select() searchResult;

  startTime: Date = new Date(new Date().setHours(new Date().getHours() + 8));
  startAddress: String = 'Current Location'; // TODO: (throughout app) display as current location instead of the address retrieved by geolocation
  walkingMinutes1 = 3;
  walkingDistance1 = 377; // TODO: this won't always be in feet.....
  station1Start: Date = new Date();
  station1End: Date = new Date();
  station1Address: String = '123 Broadway';
  station1Price = 1.75;
  bikeMinutes = 25;
  bikeDistance = 4.4;
  rentalCost = -0.30;
  station2Start: Date = new Date();
  station2End: Date = new Date();
  station2Address: String = '428 Atlantic Avenue';
  station2Price = -0.50;
  walkingMinutes2 = 4;
  walkingDistance2 = 447; // TODO: this won't always be in feet.....
  endTime: Date = new Date();
  endAddress: String = '782 MacDonough St. '; // TODO: add space for longer, complete addresses

  get totalPrice() {
    return this.station1Price + this.station2Price + this.rentalCost;
  }

  constructor() { }

  ngOnInit() {
  }

}
