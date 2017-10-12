import { Component, OnInit } from '@angular/core';

import { GeolocationService } from '../../services/geolocation.service';
import { Store } from '@ngrx/store';
import { AppState} from '../../store/reducer';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
import { TripData } from '../../shared/tripData';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
  progress: Observable<string>;
  tripData: Observable<TripData>;

  constructor(
    private geolocationService: GeolocationService,
    private store: Store<AppState>
  ) {
    this.progress = this.store.select('search').map(search => search.progress);
    this.tripData = this.store.select('search').map(search => {
      return search.result.response ? search.result.response.tripData : undefined;
    });
  }

  ngOnInit() {
    this.geolocationService.getCurrentPosition();
  };
}
