import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { ReservationSearchComponent } from './reservation-search/reservation-search.component';
import { GeolocationService } from './services/geolocation.service';
import { ReverseGeocodeService } from './services/reverse-geocode.service';
import { SearchService } from './services/search.service';
import { MapService } from './services/map.service';
import { FitboundsService } from './services/fitbounds.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer } from './redux/store';
import { IAppState } from './redux/IAppState';
// import { INITIAL_STATE } from './redux/initialState';

import { HorizontalLineComponent } from './reservation-search/search-container/horizontal-line/horizontal-line.component';
import { MinutesPipe } from './pipes/minutes.pipe';
import { AddMinutesPipe } from './pipes/add-minutes.pipe';
import { ShortAddressPipe } from './pipes/short-address.pipe';
import { ReservationSearchModule } from './reservation-search/reservation-search.module';
import { reducer } from './store/reducer';
import { initialState } from './store/reducer';
import { searchReducer } from './reservation-search/store/search.reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ search: searchReducer }),
    StoreDevtoolsModule.instrument(),
    // EffectsModule.forRoot(),
    HttpClientModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ReservationSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
