import { Component } from '@angular/core';

@Component({
  selector: 'app-search-loader',
  template: `
    <app-search-navigate></app-search-navigate>
    <div class="loading">
      Finding bike rentals...
      <div id="loading"></div>
      <!-- TODO: clea up this spinner -->
    </div>
  `,
  styleUrls: ['search-loader.component.scss']
})
export class SearchLoaderComponent {
  constructor() { }
}
