import { Component } from '@angular/core';

@Component({
  selector: 'app-search-input',
  template: `
    <form class="input-form">
      <app-origin-input></app-origin-input>
      <app-switch-inputs></app-switch-inputs>
      <app-destination-input></app-destination-input>
      <app-date-time-input></app-date-time-input>
    </form>
    <app-search-result-container></app-search-result-container>
  `,
  styles: [`
    :host {
      position: fixed;
      z-index: 2;
      top: 10px;
      left: 10px;
      width: 320px;
      border: 1px solid grey;
      border-radius: 3px;
      padding: 5px;
      background: white;
    }
  `]
})
export class SearchInputComponent {
  constructor() {}
}
