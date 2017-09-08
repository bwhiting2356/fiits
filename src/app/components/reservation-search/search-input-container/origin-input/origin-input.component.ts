import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { select, NgRedux } from '@angular-redux/store';

import { Place } from '../../../../shared/place.model';

import { findSearchOriginName } from '../../../../redux/selectHelperFunctions';
import { SearchService } from '../../../../services/search.service';
import { IAppState } from '../../../../redux/store';

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
export class OriginInputComponent implements OnInit {
  @select(findSearchOriginName) searchOriginName;
  @select() searchOriginXShowing;
  @select() searchOriginAddressFetching;

  @ViewChild('originInput')
  public originInput: ElementRef;

  get placeholderText() {
    return this.ngRedux.getState().searchOriginAddressFetching ? 'Updating location...' : 'Enter start location';
  }

  showOrHideX($event) {
    const value = $event.srcElement.value;
    if (value === null || value.trim() === '') {
      this.searchService.searchOriginClear();
      this.searchService.searchOriginHideX();
    } else {
      this.searchService.searchOriginShowX();
    }
  }

  onXClick() {
    this.originInput.nativeElement.value = '';
    this.searchService.searchOriginClear();
    this.searchService.searchOriginHideX();
  }

  // TODO: disable origin input and display loading message when retrieving new address from reverse geocode

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private searchService: SearchService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
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
          name: this.originInput.nativeElement.value,
          coords: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        };
        this.searchService.searchOriginChange(origin);
        this.searchService.searchOriginShowX(); // TODO: is this redundant?
      });
    });
  }
}
