import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-reservation-search></app-reservation-search>
    <app-map-container></app-map-container>
  `,
  styles: [`
    app-map-container {
      position: relative;
    }
  `]
})
export class AppComponent { }
