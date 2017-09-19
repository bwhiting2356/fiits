import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-reservation-search></app-reservation-search>
  `,
  styles: [`
    app-map-container {
      position: relative;
    }
  `]
})
export class AppComponent { }
