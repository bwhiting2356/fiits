import { Component } from '@angular/core';

@Component({
  selector: 'app-search-loader',
  template: `
    <div class="horizontal-line"></div>
    <div class="loading">
      Finding bike rentals...
      <span class="glyphicon glyphicon-repeat fast-right-spinner"></span>
    </div>
  `,
  styles: [`
    .horizontal-line {
      border-top: 1px solid grey;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class SearchLoaderComponent {

  constructor() { }

}
