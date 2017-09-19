import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../redux/IAppState';
import {} from 'googlemaps';

import { Place } from '../../../../shared/place';

import { SearchService } from '../../../../services/search.service';

@Component({
  selector: 'app-origin-input',
  templateUrl: './origin-input.component.html',
  styles: [`
    .form-control-clear {
      pointer-events: all;
      cursor: pointer;
    }
  `]
})
export class OriginInputComponent implements OnInit, AfterViewInit {
  @select() searchOriginAddress;
  @select() searchOriginAddressFetching;

  @ViewChild('originInput')
  public originInput: ElementRef;

  get placeholderText() {
    return this.ngRedux.getState().searchOriginAddressFetching ? 'Updating location...' : 'Enter start location';
  }

  get showX() {
    return this.ngRedux.getState().searchOriginAddress.length > 0;
  }

  inputChange($event) {
    this.searchService.searchOriginAddAddress($event.target.value);
  }

  onXClick() {
    this.originInput.nativeElement.value = '';
    this.searchService.searchOriginClear();
    this.originInput.nativeElement.focus();  // TODO: not in redux, is this okay?
  }

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private searchService: SearchService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    // TODO: style icon inside autocomplete? https://developers.google.com/maps/documentation/javascript/places-autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.originInput.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        // get the place result
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();

        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        // set name, latitude, longitude
        const origin: Place = {
          address: this.originInput.nativeElement.value,
          coords: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        };
        this.searchService.searchOriginChange(origin);
        this.searchService.updateInputFocus();
      });
    });
  }

  ngAfterViewInit() {
    this.searchService.initializeOriginInputRef(this.originInput);
    this.searchService.updateInputFocus();
  }
}
