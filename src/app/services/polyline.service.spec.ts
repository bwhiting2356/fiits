import { TestBed, inject } from '@angular/core/testing';

import { PolylineService } from './polyline.service';

describe('PolylineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolylineService]
    });
  });

  it('should be created', inject([PolylineService], (service: PolylineService) => {
    expect(service).toBeTruthy();
  }));
});
