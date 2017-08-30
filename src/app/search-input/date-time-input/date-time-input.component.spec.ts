import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeInputComponent } from './date-time-input.component';

describe('DateTimeInputComponent', () => {
  let component: DateTimeInputComponent;
  let fixture: ComponentFixture<DateTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
