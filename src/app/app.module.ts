import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, isDevMode } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import thunk from 'redux-thunk';

import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { DateTimeInputComponent } from './search-input/date-time-input/date-time-input.component';
import { TimeTargetSelectComponent } from './search-input/date-time-input/time-target-select/time-target-select.component';
import { DateInputComponent } from './search-input/date-time-input/date-input/date-input.component';
import { TimeInputComponent } from './search-input/date-time-input/time-input/time-input.component';
import { OriginInputComponent } from './search-input/origin-input/origin-input.component';
import { DestinationInputComponent } from './search-input/destination-input/destination-input.component';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './redux/store';
import { GeolocationService } from './services/geolocation.service';
import { ReverseGeocodeService } from './services/reverse-geocode.service';
import { SearchResultComponent } from './search-input/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    MapContainerComponent,
    DateTimeInputComponent,
    TimeTargetSelectComponent,
    DateInputComponent,
    TimeInputComponent,
    OriginInputComponent,
    DestinationInputComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgReduxModule,
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwPYOksRcTuVdLW4qRxj86I9_w0uJ7OqU',
      libraries: ['places']
    })
  ],
  providers: [GeolocationService, ReverseGeocodeService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension) {

    const middleWare = [thunk];
    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, middleWare, enhancers)
  }
}
