import { Component } from '@angular/core';
import { select } from '@angular-redux/store';

import { SearchService } from '../../../../services/search.service';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent {
  @select() searchDatetime: Date;

  showDatePicker = false;

  onDateInputClick() {
    this.showDatePicker = !this.showDatePicker;
  }

  addDay() {
    this.searchService.addDay();
  }

  subtractDay() {
    this.searchService.subtractDay();

  }

  constructor(
    private searchService: SearchService
  ) { }

}
