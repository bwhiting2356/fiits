import { Component, Input } from '@angular/core';

import { SearchService } from '../../../services/search.service';
import { AuthService } from '../../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { Observable } from 'rxjs/Observable';
import { TripData } from '../../../shared/tripData';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  authenticated: Observable<boolean>;

  @Input() tripData: TripData;

  get totalPrice() {
    return (
      this.tripData.reservation1Price +
      this.tripData.reservation2Price +
      this.tripData.bicyclingPrice
    );
  }

  logIn() {
    this.authService.showLogIn()
  }

  signUp() {
    this.authService.showSignUp()
  }

  readInfo() {
    this.searchService.readInfo();
  }

  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.authenticated = this.store.select('auth').map(auth => {
      return !!auth.token
    });
  }

}
