import { Component } from '@angular/core';
import { SearchService } from 'app/services/search.service';

@Component({
  selector: 'app-switch-inputs',
  template: `
    <div class="switch-inputs">
      <span
        class="glyphicon glyphicon-resize-vertical switch-inputs"
        (click)="switchInputs()">
      </span>
    </div>
  `,
  styleUrls: ['./switch-inputs.component.css']
})
export class SwitchInputsComponent {
  switchInputs() {
    this.searchService.switchInputs();
  }

  constructor(
    private searchService: SearchService
  ) { }

}
