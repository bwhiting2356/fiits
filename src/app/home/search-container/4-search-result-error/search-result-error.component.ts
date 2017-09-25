import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-result-error',
  template: `
    <app-search-navigate></app-search-navigate>
    <p>
      {{ error }}
    </p>
  `,
  styleUrls: ['./search-result-error.component.css']
})
export class SearchResultErrorComponent {
  @Input() error: string;

  constructor() { }

}
