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

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer } from './redux/store';
import { IAppState } from './redux/IAppState';
import { INITIAL_STATE } from './redux/initialState';

import { HorizontalLineComponent } from './reservation-search/search-container/horizontal-line/horizontal-line.component';
import { MinutesPipe } from './pipes/minutes.pipe';
import { AddMinutesPipe } from './pipes/add-minutes.pipe';
import { ShortAddressPipe } from './pipes/short-address.pipe';
import { ReservationSearchModule } from './reservation-search/reservation-search.module';


@NgModule({
  declarations: [
    AppComponent,
    ReservationSearchComponent,
    HorizontalLineComponent,
    MinutesPipe,
    AddMinutesPipe,
    ShortAddressPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgReduxModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwPYOksRcTuVdLW4qRxj86I9_w0uJ7OqU',
      libraries: ['places']
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    GeolocationService,
    ReverseGeocodeService,
    SearchService,
    MapService,
    FitboundsService,
    GoogleMapsAPIWrapper,
    ReservationSearchModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension) {

    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers)
  }
}
