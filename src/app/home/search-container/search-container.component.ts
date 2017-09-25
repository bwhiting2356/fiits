import { Component, OnInit } from '@angular/core';

import { GeolocationService } from '../../services/geolocation.service';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppState} from '../../store/reducer';
import { TripQueryResponse } from '../../shared/tripQueryResponse';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
  progress: Observable<string>;
  response: Observable<TripQueryResponse>;
  error: Observable<string>;
  flashMessage: Observable<string>;
  messageClass: Observable<string>;
  // showLogin: Observable<boolean>;
  // showSignup: Observable<boolean>;
  showAuth: Observable<boolean>;

  constructor(
    private geolocationService: GeolocationService,
    private store: Store<AppState>
  ) {
    this.progress = this.store.select('search').map(search => search.progress);
    this.response = this.store.select('search').map(search => search.result.response);
    this.error = this.store.select('search').map(search => search.result.error);
    this.flashMessage = this.store.select('search').map(search => search.flash.message);
    this.messageClass = this.store.select('search').map(search => search.flash.clazz);

    this.showAuth = this.store.select('auth').map(auth => {
      return (auth.showLogin || auth.showSignup);
    })


    // this.showSearch = this.store.select('auth').map(auth => {
    //   return !(auth.showLogin || auth.showSignup);
    // })
  }

  ngOnInit() {
    this.geolocationService.getCurrentPosition();
  };
}
