import { Component } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

import { ProgressSteps } from '../../../shared/progressSteps';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-progress',
  template: `
    <div class="progress-bar" [@animateBar]="progress | async"></div>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 3px;
      display: block;
    }
    .progress-bar {
      border-bottom: 3px solid black;
      height: 3px;
    }
  `],
  animations: [
    trigger('animateBar', [
      state(ProgressSteps.NO_SEARCH, style({
        width: '0%',
      })),
      state(ProgressSteps.PENDING_1, style({
        width: '20%'
      })),
      state(ProgressSteps.VIEWING_RESULT, style({
        width: '40%'
      })),
      state(ProgressSteps.READING_INFO, style({
        width: '60%'
      })),
      state(ProgressSteps.PENDING_2, style({
        width: '80%'
      })),
      state(ProgressSteps.VIEWING_RESERV, style({
        width: '100%'
      })),
      state(ProgressSteps.ERROR_1, style({
        width: '100%'
      })),
      state(ProgressSteps.ERROR_2, style({
        width: '100%'
      })),
    ])
  ]
})
export class ProgressComponent {
  progress: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) {
    this.progress = this.store.select('search').map(search => search.progress)
  }
}
