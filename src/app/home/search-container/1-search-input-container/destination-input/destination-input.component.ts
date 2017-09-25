import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';

import { SearchService } from '../../../../services/search.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';

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
  destinationAddress: Observable<string>;
  destinationFetching: Observable<boolean>;
  placeholderText: Observable<string>;
  showX: Observable<boolean>;
  focus: Observable<boolean>;

  @ViewChild('destinationInput')
  public destinationInput: ElementRef;


  inputChange($event) {
    this.searchService.destinationChange($event.srcElement.value, undefined);
  }

  onXClick() {
    this.searchService.destinationClear();
  }

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private searchService: SearchService,
    private store: Store<AppState>
  ) {
    this.destinationAddress = this.store.select('search', ).map(search => search.destination.address);
    this.destinationFetching = this.store.select('search').map(search => search.destination.fetching);
    this.placeholderText = this.destinationFetching.map(fetching => {
      return fetching ? 'Updating location...' : 'Enter destination';
    });
    this.showX = this.destinationAddress.map(address => {
      return address.length > 0;
    });

  }

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
        const address = this.destinationInput.nativeElement.value;
        const coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        this.searchService.destinationNewLocation(address, coords);
        this.searchService.updateInputFocus();
      });
    });
  }

  ngAfterViewInit() {
    this.store.select('search').map(search => search.destination.focus).subscribe(focus => {
      if (focus) {
        this.destinationInput.nativeElement.focus();
      }
    })
  }
}
