import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../redux/store';
import { Place } from '../../models/place.model';
import {
  SEARCH_DESTINATION_CHANGE,
  SEARCH_DESTINATION_CLEAR,
  SEARCH_DESTINATION_SHOW_X,
  SEARCH_DESTINATION_HIDE_X,
  MAP_REDO_FITBOUNDS
} from '../../redux/actions';

import { searchParametersChanged } from '../../redux/actionCreators';

import { findSearchDestinationName } from '../../redux/selectFunctions';

@Component({
  selector: 'app-destination-input',
  templateUrl: './destination-input.component.html',
  styleUrls: ['./destination-input.component.scss']
})
export class DestinationInputComponent implements OnInit {
  @select(findSearchDestinationName) searchDestinationName;
  @select('searchDestinationShowX') searchDestinationShowX;

  @ViewChild('destinationInput')
  public destinationInput: ElementRef;

  showOrHideX($event) {
    const value = $event.srcElement.value;
    if (value === null || value.trim() === '') {
      this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CLEAR });
      this.ngRedux.dispatch({ type: SEARCH_DESTINATION_HIDE_X });
      this.ngRedux.dispatch(searchParametersChanged());
    } else {
      this.ngRedux.dispatch({ type: SEARCH_DESTINATION_SHOW_X });
    }
  }

  onXClick() {
    this.destinationInput.nativeElement.value = '';
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CLEAR });
    this.ngRedux.dispatch({ type: SEARCH_DESTINATION_HIDE_X });
    this.ngRedux.dispatch(searchParametersChanged());

  }

  // TODO: disable destination input and display loading message when retrieving new address from reverse geocode

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.destinationInput.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set name, latitude, longitude
          const destination: Place = {
            name: this.destinationInput.nativeElement.value,
            coords: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }
          };
          this.ngRedux.dispatch({ type: SEARCH_DESTINATION_CHANGE, body: destination});
          this.ngRedux.dispatch({ type: MAP_REDO_FITBOUNDS });
          this.ngRedux.dispatch({ type: SEARCH_DESTINATION_SHOW_X });
          this.ngRedux.dispatch(searchParametersChanged());
        });
      });
    });
  }
}
