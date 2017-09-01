import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, isDevMode } from '@angular/core';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import thunk from 'redux-thunk';

import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { MapContainerComponent } from './components/map-container/map-container.component';
import { DateTimeInputComponent } from './components/search-input/date-time-input/date-time-input.component';
import { TimeTargetSelectComponent } from './components/search-input/date-time-input/time-target-select/time-target-select.component';
import { DateInputComponent } from './components/search-input/date-time-input/date-input/date-input.component';
import { TimeInputComponent } from './components/search-input/date-time-input/time-input/time-input.component';
import { OriginInputComponent } from './components/search-input/origin-input/origin-input.component';
import { DestinationInputComponent } from './components/search-input/destination-input/destination-input.component';
import { SearchResultComponent } from './components/search-input/search-result-container/search-result/search-result.component';

import { GeolocationService } from './services/geolocation.service';
import { ReverseGeocodeService } from './services/reverse-geocode.service';
import { DirectionsService } from './services/directions.service';
import { SearchService } from './services/search.service';
import { MapService } from './services/map.service';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './redux/store';
import {MapExtensionDirective} from "./components/map-container/map-extension.directive";
import { SearchResultContainerComponent } from './components/search-input/search-result-container/search-result-container.component';
import { SearchLoaderComponent } from './components/search-input/search-result-container/search-loader/search-loader.component';

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
    SearchResultComponent,
    MapExtensionDirective,
    SearchResultContainerComponent,
    SearchLoaderComponent
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
  providers: [
    GeolocationService,
    ReverseGeocodeService,
    DirectionsService,
    SearchService,
    MapService,
    GoogleMapsAPIWrapper
  ],
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
