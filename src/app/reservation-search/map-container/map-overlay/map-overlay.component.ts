import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-map-overlay',
  template: `
    <div class="overlay" [@opacityFade]="state" *ngIf="mapRendering | async"></div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 1);
      opacity: 0.3;
      z-index: 1;
    }
  `],
  animations: [
    trigger('opacityFade', [
      state('active', style({
        opacity: '0.3'
      })),
      state('void', style({
        opacity: '0'
      })),
      transition('* => *', [
        animate('300ms ease-in')
      ]),
    ])
  ]
})
export class MapOverlayComponent {
  @select() mapRendering;
  state = 'active';
  constructor() { }
}
