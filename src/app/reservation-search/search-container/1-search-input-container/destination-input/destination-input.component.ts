import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { NgRedux, select } from '@angular-redux/store';
import {} from 'googlemaps';

import { Place } from '../../../../shared/place';
import { SearchService } from '../../../../services/search.service';
import { IAppState } from '../../../../redux/IAppState';

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
export class DestinationInputComponent implements OnInit, AfterViewInit {
  @select() searchDestinationAddress;
  @select() searchDestinationAddressFetching;

  @ViewChild('destinationInput')
  public destinationInput: ElementRef;

  get placeholderText() {
    return this.ngRedux.getState().searchDestinationAddressFetching ? 'Updating location...' : 'Enter destination';
  }

  get showX() {
    return this.destinationInput.nativeElement.value.length > 0;
  }

  inputChange($event) {
    this.searchService.searchDestinationAddAddress($event.srcElement.value);
  }

  onXClick() {
    this.destinationInput.nativeElement.value = '';
    this.searchService.searchDestinationClear();
    this.destinationInput.nativeElement.focus();
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
          address: this.destinationInput.nativeElement.value,
          coords: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        };
        this.searchService.searchDestinationChange(destination);
        this.searchService.updateInputFocus();
      });
    });
  }

  ngAfterViewInit() {
    this.searchService.initializeDestinationInputRef(this.destinationInput);
  }
}
