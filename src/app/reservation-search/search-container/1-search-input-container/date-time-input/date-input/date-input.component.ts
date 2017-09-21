import { Component } from '@angular/core';
import { SearchService } from '../../../../../services/search.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent {
  time: Observable<Date>;

  showDatePicker = false;

  onDateInputClick() {
    this.showDatePicker = !this.showDatePicker;
  }

  addDay() {
    this.searchService.addDay();
  }

  subtractDay() {
    this.searchService.subtractDay();

  }

  constructor(
    private searchService: SearchService,
    private store: Store<AppState>
  ) {
    this.time = this.store.select('search').map(search => search.time.time);
  }

}
