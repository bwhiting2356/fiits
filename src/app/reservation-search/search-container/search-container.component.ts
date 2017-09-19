import { Component, OnInit } from '@angular/core';

import { select } from '@angular-redux/store';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
  @select() searchProgress;
  @select() searchResult;

  constructor(
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    this.geolocationService.getCurrentPosition();
  };
}
