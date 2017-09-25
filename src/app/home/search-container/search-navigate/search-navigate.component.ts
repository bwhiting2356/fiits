import { Component, Input } from '@angular/core';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-navigate',
  template: `
    <div class="navigate">
      <span
        *ngIf="backButton"
        class="glyphicon glyphicon-chevron-left"
        (click)="backOneStep()">
      </span>
      <span
        class="glyphicon glyphicon-remove"
        (click)="cancelSearch()">
      </span>
    </div>
    <app-horizontal-line></app-horizontal-line>
  `,
  styleUrls: ['./search-navigate.component.css']
})
export class SearchNavigateComponent {
  @Input() backButton = true;
  backOneStep() {
    this.searchService.backOneStep();
  }

  cancelSearch() {
    this.searchService.reset();
  }

  constructor(
    private searchService: SearchService
  ) { }

}
