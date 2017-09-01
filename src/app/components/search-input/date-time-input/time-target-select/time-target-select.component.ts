import { Component } from '@angular/core';
import { select } from '@angular-redux/store';

import { SearchService } from '../../../../services/search.service';

@Component({
  selector: 'app-time-target-select',
  templateUrl: './time-target-select.component.html',
  styleUrls: ['./time-target-select.component.scss']
})
export class TimeTargetSelectComponent {
  @select() searchTimeTarget;
  targetOptionsShowing = false;

  onTimeTargetOptionsClick() {
    this.targetOptionsShowing = !this.targetOptionsShowing;
  }

  onTargetOptionClick(value) {
    this.searchService.changeTimeTarget(value);
    this.targetOptionsShowing = false;
  }

  constructor(
    private searchService: SearchService
  ) { }
}
