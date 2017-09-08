import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition } from '@angular/animations';
import { select } from '@angular-redux/store';
import { ProgressSteps } from '../../../shared/progressSteps';

@Component({
  selector: 'app-progress',
  template: `
    <div class="progress-bar" [@animateBar]="searchProgress | async"></div>
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
      state(ProgressSteps.noSearch, style({
        width: '0%',
      })),
      state(ProgressSteps.searchSubmitted, style({
        width: '20%'
      })),
      state(ProgressSteps.resultReceived, style({
        width: '40%'
      })),
      state(ProgressSteps.bookingRequested, style({
        width: '60%'
      })),
      state(ProgressSteps.infoRead, style({
        width: '80%'
      })),
      state(ProgressSteps.bookingConfirmed, style({
        width: '100%'
      })),
    ])
  ]
})
export class ProgressComponent {
  @select() searchProgress;

  constructor() { }

}
