import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-search-input></app-search-input>
    <app-map-container></app-map-container>
  `,
  styles: [`
    app-map-container {
      position: relative;
    }
  `]
})
export class AppComponent { }
