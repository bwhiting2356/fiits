import { Component } from '@angular/core';

import { TimeTargets } from '../../../../shared/timeTarget';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-date-time-input',
  template: `
    <app-time-target-select></app-time-target-select>
    <app-time-input *ngIf="showDateTimeOptions | async"></app-time-input>
    <app-date-input *ngIf="showDateTimeOptions | async"></app-date-input>
  `,
  styleUrls: ['./date-time-input.component.scss']
})
export class DateTimeInputComponent {
  showDateTimeOptions: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {
    this.showDateTimeOptions = this.store.select('search').map(search => search.time.timeTarget)
      .map(timeTarget => timeTarget !== TimeTargets.LEAVE_NOW);
  }
}
