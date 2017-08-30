import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../redux/store';
import { Place } from '../../models/place.model';
import {
  SEARCH_ORIGIN_CHANGE,
  SEARCH_ORIGIN_CLEAR,
  SEARCH_ORIGIN_SHOW_X,
  SEARCH_ORIGIN_HIDE_X,
  MAP_REDO_FITBOUNDS
} from '../../redux/actions';

import { searchParametersChanged } from '../../redux/actionCreators';

import { findSearchOriginName } from '../../redux/selectFunctions';

@Component({
  selector: 'app-origin-input',
  templateUrl: './origin-input.component.html',
  styleUrls: ['./origin-input.component.scss']
})
export class OriginInputComponent implements OnInit, AfterViewInit {
  @select(findSearchOriginName) searchOriginName;
  @select('searchOriginShowX') searchOriginShowX;

  @ViewChild('originInput')
  public originInput: ElementRef;

  showOrHideX($event) {
    const value = $event.srcElement.value;
    if (value === null || value.trim() === '') {
      this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CLEAR });
      this.ngRedux.dispatch({ type: SEARCH_ORIGIN_HIDE_X });
      this.ngRedux.dispatch(searchParametersChanged());
    } else {
      this.ngRedux.dispatch({ type: SEARCH_ORIGIN_SHOW_X });
    }
  }

  onXClick() {
    this.originInput.nativeElement.value = '';
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CLEAR });
    this.ngRedux.dispatch({ type: SEARCH_ORIGIN_HIDE_X });
    this.ngRedux.dispatch(searchParametersChanged());
  }

  // TODO: disable origin input and display loading message when retrieving new address from reverse geocode

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.originInput.nativeElement, {
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
          const origin: Place = {
            name: this.originInput.nativeElement.value,
            coords: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }
          };
          this.ngRedux.dispatch({ type: SEARCH_ORIGIN_CHANGE, body: origin});
          this.ngRedux.dispatch(searchParametersChanged());
          this.ngRedux.dispatch({ type: MAP_REDO_FITBOUNDS });
          this.ngRedux.dispatch({ type: SEARCH_ORIGIN_SHOW_X });
        });
      });
    });
  }
}
