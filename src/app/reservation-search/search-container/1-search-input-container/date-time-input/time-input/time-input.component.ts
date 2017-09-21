import { Component } from '@angular/core';

import { SearchService } from '../../../../../services/search.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent {
  time: Observable<Date>;

  showTimePicker = false;

  onTimeInputClick() {
    this.showTimePicker = !this.showTimePicker;
  }

  addMinutes(value) {
    this.searchService.addMinutes(value);
  }

  subtractMinutes(value) {
    this.searchService.subractMinutes(value);
  }

  constructor(
    private searchService: SearchService,
    private store: Store<AppState>
  ) {
    this.time = this.store.select('search').map(search => search.time.time)
  }
}
