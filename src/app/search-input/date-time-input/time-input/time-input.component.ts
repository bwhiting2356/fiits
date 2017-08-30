import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../../redux/store';
import { SEARCH_ADD_TEN_MINUTES, SEARCH_SUBTRACT_TEN_MINUTES } from '../../../redux/actions'
import { searchParametersChanged } from '../../../redux/actionCreators';

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

  addTime() {
    this.ngRedux.dispatch({ type: SEARCH_ADD_TEN_MINUTES });
    this.ngRedux.dispatch(searchParametersChanged());
  }

  subtractTime() {
    this.ngRedux.dispatch({ type: SEARCH_SUBTRACT_TEN_MINUTES });
    this.ngRedux.dispatch(searchParametersChanged());
  }

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }


}
