import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';

@Component({
  selector: 'app-date-time-input',
  template: `
    <app-time-target-select></app-time-target-select>
    <app-time-input *ngIf="showDateTimeOptions"></app-time-input>
    <app-date-input *ngIf="showDateTimeOptions"></app-date-input>
  `,
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
