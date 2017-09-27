import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-side-nav></app-side-nav>
    <app-reservation-search></app-reservation-search>
    <!--<app-login></app-login>-->
  `,
  styles: [`
    .test {
      color: red
    }
    app-map-container {
      position: relative;
    }
  `]
})
export class AppComponent { }
