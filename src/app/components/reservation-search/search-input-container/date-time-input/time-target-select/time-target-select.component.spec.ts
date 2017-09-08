import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTargetSelectComponent } from './time-target-select.component';

describe('TimeTargetSelectComponent', () => {
  let component: TimeTargetSelectComponent;
  let fixture: ComponentFixture<TimeTargetSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTargetSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTargetSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
