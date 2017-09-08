import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { NgRedux, select } from '@angular-redux/store';
import {} from 'googlemaps';

import { Place } from '../../../../shared/place';
import { findSearchDestinationName } from '../../../../redux/selectHelperFunctions';
import { SearchService } from '../../../../services/search.service';
import { IAppState } from '../../../../redux/store';

@Component({
  selector: 'app-destination-input',
  templateUrl: './destination-input.component.html',
  styles: [`
    .form-control-clear {
      pointer-events: all;
      cursor: pointer;
    }
  `]
})
export class DestinationInputComponent implements OnInit {
  @select(findSearchDestinationName) searchDestinationName;
  @select() searchDestinationXShowing;
  @select() searchDestinationAddressFetching;

  @ViewChild('destinationInput')
  public destinationInput: ElementRef;

  get placeholderText() {
    return this.ngRedux.getState().searchDestinationAddressFetching ? 'Updating location...' : 'Enter destination';
  }

  showOrHideX($event) {
    const value = $event.srcElement.value;
    if (value === null || value.trim() === '') {
      this.searchService.searchDestinationClear();
      this.searchService.searchDestinationHideX();
    } else {
      this.searchService.searchDestinationShowX();
    }
  }

  onXClick() {
    this.destinationInput.nativeElement.value = '';
    this.searchService.searchDestinationClear();
    this.searchService.searchDestinationHideX();
  }

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private searchService: SearchService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.destinationInput.nativeElement, {
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
        const destination: Place = {
          name: this.destinationInput.nativeElement.value,
          coords: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        };
        this.searchService.searchDestinationChange(destination);
        this.searchService.searchDestinationShowX(); // TODO: is this redundant?
      });
    });
  }
}
