import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReservationSearchComponent } from './reservation-search.component';
import { MapContainerComponent } from './map-container/map/map-container.component';
import { DateTimeInputComponent } from './search-container/1-search-input-container/date-time-input/date-time-input.component';
import { TimeTargetSelectComponent } from './search-container/1-search-input-container/date-time-input/time-target-select/time-target-select.component';
import { DateInputComponent } from './search-container/1-search-input-container/date-time-input/date-input/date-input.component';
import { TimeInputComponent } from './search-container/1-search-input-container/date-time-input/time-input/time-input.component';
import { OriginInputComponent } from './search-container/1-search-input-container/origin-input/origin-input.component';
import { DestinationInputComponent } from './search-container/1-search-input-container/destination-input/destination-input.component';
import { SearchResultComponent } from './search-container/3-search-result/search-result.component';
import { MapExtensionDirective } from './map-container/map/map-extension.directive';
import { SearchLoaderComponent } from './search-container/2-search-loader/search-loader.component';
import { MapOverlayComponent } from './map-container/map-overlay/map-overlay.component';
import { SwitchInputsComponent } from './search-container/1-search-input-container/switch-inputs/switch-inputs.component';
import { ProgressComponent } from './search-container/progress/progress.component';
import { SearchContainerComponent } from './search-container/search-container.component';
import { SearchInputContainerComponent } from './search-container/1-search-input-container/search-input-container.component';
import { SearchNavigateComponent } from './search-container/search-navigate/search-navigate.component';
import { SearchResultErrorComponent } from './search-container/4-search-result-error/search-result-error.component';
import { SearchInfoComponent } from './search-container/5-search-info/search-info.component';
import { BookingSuccessComponent } from './search-container/6-booking-success/booking-success.component';
import { BookingErrorComponent } from './search-container/7-booking-error/booking-error.component';
import { PolylineComponent } from './map-container/polyline/polyline.component';
import { GeolocationService } from '../services/geolocation.service';
import { ReverseGeocodeService } from '../services/reverse-geocode.service';
import { SearchService } from '../services/search.service';
import { MapService } from '../services/map.service';
import { FitboundsService } from '../services/fitbounds.service';
import { MinutesPipe } from '../pipes/minutes.pipe';
import { AddMinutesPipe } from '../pipes/add-minutes.pipe';
import { ShortAddressPipe } from '../pipes/short-address.pipe';
import { HorizontalLineComponent } from './search-container/horizontal-line/horizontal-line.component';


export const COMPONENTS = [
  MapContainerComponent,
  PolylineComponent,
  ReservationSearchComponent,
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
  SearchContainerComponent,
  SearchInputContainerComponent,
  SearchNavigateComponent,
  SearchResultErrorComponent,
  SearchInfoComponent,
  BookingSuccessComponent,
  BookingErrorComponent,
  HorizontalLineComponent
];

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwPYOksRcTuVdLW4qRxj86I9_w0uJ7OqU',
      libraries: ['places']
    }),
  ],
  declarations: [
    COMPONENTS,
    MinutesPipe,
    AddMinutesPipe,
    ShortAddressPipe
  ],
  providers: [
    GeolocationService,
    ReverseGeocodeService,
    SearchService,
    MapService,
    FitboundsService,
    GoogleMapsAPIWrapper,
  ],
  exports: [COMPONENTS]
})
export class ReservationSearchModule { }



