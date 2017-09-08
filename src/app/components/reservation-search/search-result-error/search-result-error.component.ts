import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-search-result-error',
  template: `
    <app-search-navigate></app-search-navigate>
    <p>
      {{ searchError | async }}
    </p>
  `,
  styleUrls: ['./search-result-error.component.css']
})
export class SearchResultErrorComponent implements OnInit {
  @select() searchError;

  constructor() { }

  ngOnInit() {
  }

}
