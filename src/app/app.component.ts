import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-side-nav></app-side-nav>
    <router-outlet></router-outlet>
    <!--<app-home></app-home>-->
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
