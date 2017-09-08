import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingErrorComponent } from './booking-error.component';

describe('BookingErrorComponent', () => {
  let component: BookingErrorComponent;
  let fixture: ComponentFixture<BookingErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
