import { trigger, state, style, transition, animate } from '@angular/animations';

import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-layer',
  template: `
  <div class="layer" [@opacityFade]="state"></div>
  `,
  styles: [`
    .layer {
      width: 100vw;
      height: 100vh;
      background-color: white;
      position: absolute;
      z-index: 4;
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
      // TODO: transition to void not working (here and in map layer)
    ])
  ]
})
export class NavLayerComponent {
  state = 'active';
  constructor() {}
}
