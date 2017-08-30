import { TestBed, inject } from '@angular/core/testing';

import { ReverseGeocodeService } from './reverse-geocode.service';

describe('ReverseGeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReverseGeocodeService]
    });
  });

  it('should be created', inject([ReverseGeocodeService], (service: ReverseGeocodeService) => {
    expect(service).toBeTruthy();
  }));
});
