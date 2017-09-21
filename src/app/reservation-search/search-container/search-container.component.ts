import { Component, OnInit } from '@angular/core';

// import { select } from '@angular-redux/store';
import { GeolocationService } from '../../services/geolocation.service';
import { Store } from '@ngrx/store';
import { SearchState } from '../store/search.state';
import { Observable } from 'rxjs/Observable';
import {AppState} from '../../store/reducer';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
  progress: Observable<string>;

  constructor(
    private geolocationService: GeolocationService,
    private store: Store<AppState>
  ) {
    this.progress = this.store.select('search').map(search => search.progress);
  }

  ngOnInit() {
    this.geolocationService.getCurrentPosition();
  };
}
