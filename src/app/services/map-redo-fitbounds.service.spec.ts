import { TestBed, inject } from '@angular/core/testing';

import { MapRedoFitboundsService } from './map-redo-fitbounds.service';

describe('MapRedoFitboundsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapRedoFitboundsService]
    });
  });

  it('should be created', inject([MapRedoFitboundsService], (service: MapRedoFitboundsService) => {
    expect(service).toBeTruthy();
  }));
});
