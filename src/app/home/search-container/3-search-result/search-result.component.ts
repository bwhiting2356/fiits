import { Component, Input } from '@angular/core';

import { SearchService } from '../../../services/search.service';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { Observable } from 'rxjs/Observable';
import { TripData } from '../../../shared/tripData';
import { Router } from '@angular/router';

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
    this.router.navigate(['login'])
    // this.authService.showLogIn()
  }

  signUp() {
    this.router.navigate(['signup'])
    // this.authService.showSignUp()
  }

  readInfo() {
    this.searchService.readInfo();
  }

  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.authenticated = this.store.select('auth').map(auth => {
      return !!auth.token
    });
  }

}
