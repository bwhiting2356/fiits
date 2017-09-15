import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-polyline',
  template: '<div></div>',
})
export class PolylineComponent implements OnInit, OnDestroy {
  @Input() points;
  @Input() lineId;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.addPolyline(this.points, this.lineId);
  }

  ngOnDestroy() {
    this.mapService.removePolyline(this.lineId);
  }
}

