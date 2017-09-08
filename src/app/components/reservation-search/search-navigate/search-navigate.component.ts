import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-navigate',
  template: `
    <div class="navigate">
      <span
        class="glyphicon glyphicon-chevron-left"
        (click)="backOneStep()"
      ></span>
      <span
        class="glyphicon glyphicon-remove"
        (click)="cancelSearch()">
      </span>
    </div>
  `,
  styleUrls: ['./search-navigate.component.css']
})
export class SearchNavigateComponent implements OnInit {
  backOneStep() {
    this.searchService.backOneStep();
  }

  cancelSearch() {
    this.searchService.cancelSearch();
  }

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

}
