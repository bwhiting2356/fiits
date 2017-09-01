import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';

@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss']
})
export class DateTimeInputComponent {

  get showDateTimeOptions() {
    const searchTimeTarget = this.ngRedux.getState().searchTimeTarget;
    // TODO: should I refactor with the select pattern for consistency?

    if (searchTimeTarget ===  'Leave now') {
      return false;
    } else {
      return true;
    }
  }

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}
}
