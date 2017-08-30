import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../../redux/store';
import { SEARCH_ADD_DAY, SEARCH_SUBTRACT_DAY } from '../../../redux/actions'
import { searchParametersChanged } from '../../../redux/actionCreators';

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
    this.ngRedux.dispatch({ type: SEARCH_ADD_DAY });
    this.ngRedux.dispatch(searchParametersChanged());
  }

  subtractDay() {
    this.ngRedux.dispatch({ type: SEARCH_SUBTRACT_DAY });
    this.ngRedux.dispatch(searchParametersChanged());
  }

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

}
