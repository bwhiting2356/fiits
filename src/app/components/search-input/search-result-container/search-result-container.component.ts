import { Component, } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-search-result-container',
  templateUrl: './search-result-container.component.html',
  styleUrls: ['./search-result-container.component.css']
})
export class SearchResultContainerComponent {
  @select() searchFetching;
  @select() searchResult;

  constructor() { }

}
