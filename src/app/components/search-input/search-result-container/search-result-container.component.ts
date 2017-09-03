import { Component, } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-search-result-container',
  template: `
    <app-search-loader *ngIf="searchFetching | async">
    </app-search-loader>
    <app-search-result *ngIf="searchResult | async" [searchResult]="searchResult | async">
    </app-search-result>
  `,
  styleUrls: []
})
export class SearchResultContainerComponent {
  @select() searchFetching;
  @select() searchResult;

  constructor() { }
}
