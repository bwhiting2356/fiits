import { Component } from '@angular/core';

@Component({
  selector: 'app-search-loader',
  template: `
    <div class="horizontal-line"></div>
    <div class="loading">
      Finding bike rentals...
      <!--<span class="glyphicon glyphicon-repeat fast-right-spinner"></span>-->
      <div id="loading"></div>
    </div>
  `,
  styles: [`
    .horizontal-line {
      border-top: 1px solid grey;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    #loading {
      width: 50px;
      height: 50px;
      border: 5px solid lightgrey;
      border-top-color: black;
      border-radius: 100%;
      animation: round 1.2s linear infinite;
    }
    @keyframes round {
      from {
        transform: rotate(0deg)
      }
      to {
        transform: rotate(360deg)
      }
    }
  `]
})
export class SearchLoaderComponent {

  constructor() { }

}
