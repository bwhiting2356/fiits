import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PolylineService } from '../../../services/polyline.service';

@Component({
  selector: 'app-polyline',
  template: '<div></div>',
})
export class PolylineComponent implements OnInit, OnDestroy {
  @Input() points;
  @Input() lineId;

  constructor(private polylineService: PolylineService) {}

  ngOnInit() {
    this.polylineService.addPolyline(this.points, this.lineId);
  }

  ngOnDestroy() {
    this.polylineService.removePolyline(this.lineId);
  }
}

