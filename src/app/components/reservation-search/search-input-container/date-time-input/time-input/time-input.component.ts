import { Component } from '@angular/core';
import { select } from '@angular-redux/store';

import { SearchService } from '../../../../../services/search.service';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent {
  @select() searchDatetime: Date;

  showTimePicker = false;

  onTimeInputClick() {
    this.showTimePicker = !this.showTimePicker;
  }

  addTenMinutes() {
    this.searchService.addTenMinutes();
  }

  subtractTenMinutes() {
    this.searchService.subractTenMinutes();
  }

  constructor(
    private searchService: SearchService
  ) { }


}
