import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SearchService } from '../../../../../services/search.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';

import { TimeTarget } from '../../../../../shared/timeTarget';

@Component({
  selector: 'app-time-target-select',
  templateUrl: './time-target-select.component.html',
  styleUrls: ['./time-target-select.component.scss']
})
export class TimeTargetSelectComponent {
  timeTarget: Observable<TimeTarget>;

  onTargetOptionClick(value) {
    this.searchService.changeTimeTarget(value);
  }

  constructor(
    private searchService: SearchService,
    private store: Store<AppState>
  ) {
    this.timeTarget = this.store.select('search').map(search => search.time.timeTarget);
  }
}
