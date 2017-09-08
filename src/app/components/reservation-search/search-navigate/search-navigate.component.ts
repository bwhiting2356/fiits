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
  `,
  styleUrls: ['./search-navigate.component.css']
})
export class SearchNavigateComponent {
  @Input() backButton = true;
  backOneStep() {
    this.searchService.searchBackOneStep();
  }

  cancelSearch() {
    this.searchService.searchReset();
  }

  constructor(
    private searchService: SearchService
  ) { }

}
