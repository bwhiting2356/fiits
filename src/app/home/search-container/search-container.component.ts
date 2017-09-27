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
  response: Observable<TripData>;
  showAuth: Observable<boolean>;

  constructor(
    private geolocationService: GeolocationService,
    private store: Store<AppState>
  ) {
    this.progress = this.store.select('search').map(search => search.progress);
    this.response = this.store.select('search').map(search => search.result.response.tripData);
    this.showAuth = this.store.select('auth').map(auth => auth.showAuth);
  }

  ngOnInit() {
    this.geolocationService.getCurrentPosition();
  };
}
