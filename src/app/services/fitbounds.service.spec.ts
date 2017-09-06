import { TestBed, inject } from '@angular/core/testing';

import { FitboundsService } from './fitbounds.service';

describe('FitboundsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitboundsService]
    });
  });

  it('should be created', inject([FitboundsService], (service: FitboundsService) => {
    expect(service).toBeTruthy();
  }));
});
