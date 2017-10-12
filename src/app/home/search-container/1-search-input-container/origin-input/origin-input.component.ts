import {
  Component, OnInit, ViewChild, ElementRef, OnChanges
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';

import { SearchService } from '../../../../services/search.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { Observable } from 'rxjs/Observable';

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
export class OriginInputComponent implements OnInit, OnChanges {
  originAddress: Observable<string>;
  originFetching: Observable<boolean>;
  placeholderText: Observable<string>;
  showX: Observable<boolean>;
  focus: Observable<boolean>;

  @ViewChild('originInput')
  public originInput: ElementRef;

  inputChange($event) {
    this.searchService.originChange($event.target.value, undefined);
  }

  onXClick() {
    this.searchService.originClear();
  }

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private searchService: SearchService,
    private store: Store<AppState>
  ) {
    this.originAddress = this.store.select('search', ).map(search => search.origin.address);
    this.originFetching = this.store.select('search').map(search => search.origin.fetching);
    this.placeholderText = this.originFetching.map(fetching => {
      return fetching ? 'Updating location...' : 'Enter start location';
    });
    this.showX = this.originAddress.map(address => {
      return address.length > 0;
    });
  }

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
        const address = this.originInput.nativeElement.value;
        const coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        this.searchService.originNewLocation(address, coords);
        // this.searchService.originChange(address, coords);
        this.searchService.updateInputFocus();
      });
    });
  }

  ngOnChanges() {
    this.store.select('search').map(search => search.origin.focus).subscribe(focus => {
      if (focus) {
        this.originInput.nativeElement.focus();
      }
    });
  }
}
