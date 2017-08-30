import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../../redux/store';
import { SEARCH_CHANGE_TIMETARGET, SEARCH_SET_TIME_TO_NOW } from '../../../redux/actions'
import { TimeTarget } from '../../../models/timetarget.model';
import { searchParametersChanged } from '../../../redux/actionCreators';

@Component({
  selector: 'app-time-target-select',
  templateUrl: './time-target-select.component.html',
  styleUrls: ['./time-target-select.component.scss']
})
export class TimeTargetSelectComponent {
  @select() searchTimeTarget;
  targetOptionsShowing = false;

  onTimeTargetOptionsClick() {
    this.targetOptionsShowing = !this.targetOptionsShowing;
  }

  onTargetOptionClick(value) {
    switch (value) {
      case 'Leave now': {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.LEAVE_NOW });
        this.ngRedux.dispatch({ type: SEARCH_SET_TIME_TO_NOW });
        this.ngRedux.dispatch(searchParametersChanged());
        break;
      }
      case 'Depart at': {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.DEPART_AT });
        this.ngRedux.dispatch(searchParametersChanged());
        break;
      }
      case 'Arrive by': {
        this.ngRedux.dispatch({ type: SEARCH_CHANGE_TIMETARGET, body: TimeTarget.ARRIVE_BY });
        this.ngRedux.dispatch(searchParametersChanged());
        break;
      }
    }
    this.targetOptionsShowing = false;
  }

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }
}
