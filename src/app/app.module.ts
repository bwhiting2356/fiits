import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, isDevMode } from '@angular/core';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { MapContainerComponent } from './components/map-container/map-container.component';
import { MapExtensionDirective } from './components/map-container/map-extension.directive';
import { ReservationSearchComponent } from './components/reservation-search/reservation-search.component';
import { DateTimeInputComponent } from './components/reservation-search/search-input-container/date-time-input/date-time-input.component';
import { TimeTargetSelectComponent } from './components/reservation-search/search-input-container/date-time-input/time-target-select/time-target-select.component';
import { DateInputComponent } from './components/reservation-search/search-input-container/date-time-input/date-input/date-input.component';
import { TimeInputComponent } from './components/reservation-search/search-input-container/date-time-input/time-input/time-input.component';
import { OriginInputComponent } from './components/reservation-search/search-input-container/origin-input/origin-input.component';
import { DestinationInputComponent } from './components/reservation-search/search-input-container/destination-input/destination-input.component';
import { SearchResultComponent } from './components/reservation-search/search-result/search-result.component';
import { SearchLoaderComponent } from './components/reservation-search/search-loader/search-loader.component';

import { GeolocationService } from './services/geolocation.service';
import { ReverseGeocodeService } from './services/reverse-geocode.service';
import { SearchService } from './services/search.service';
import { MapService } from './services/map.service';
import { FitboundsService } from './services/fitbounds.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './redux/store';
import { MapOverlayComponent } from './components/map-container/map-overlay/map-overlay.component';
import { SwitchInputsComponent } from './components/reservation-search/search-input-container/switch-inputs/switch-inputs.component';
import { ProgressComponent } from './components/reservation-search/progress/progress.component';
import { SearchInputContainerComponent } from './components/reservation-search/search-input-container/search-input-container.component';
import { SearchNavigateComponent } from './components/reservation-search/search-navigate/search-navigate.component';
import { SearchResultErrorComponent } from './components/reservation-search/search-result-error/search-result-error.component';
import { SearchInfoComponent } from './components/reservation-search/search-info/search-info.component';
import { BookingSuccessComponent } from './components/reservation-search/booking-success/booking-success.component';
import { BookingErrorComponent } from './components/reservation-search/booking-error/booking-error.component';


@NgModule({
  declarations: [
    AppComponent,
    ReservationSearchComponent,
    MapContainerComponent,
    DateTimeInputComponent,
    TimeTargetSelectComponent,
    DateInputComponent,
    TimeInputComponent,
    OriginInputComponent,
    DestinationInputComponent,
    SearchResultComponent,
    MapExtensionDirective,
    SearchLoaderComponent,
    MapOverlayComponent,
    SwitchInputsComponent,
    ProgressComponent,
    SearchInputContainerComponent,
    SearchNavigateComponent,
    SearchResultErrorComponent,
    SearchInfoComponent,
    BookingSuccessComponent,
    BookingErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgReduxModule,
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwPYOksRcTuVdLW4qRxj86I9_w0uJ7OqU',
      libraries: ['places']
    }),
    BrowserAnimationsModule
  ],
  providers: [
    GeolocationService,
    ReverseGeocodeService,
    SearchService,
    MapService,
    FitboundsService,
    GoogleMapsAPIWrapper
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
