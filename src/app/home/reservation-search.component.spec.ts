import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSearchComponent } from './reservation-search.component';

describe('SearchInputComponent', () => {
  let component: ReservationSearchComponent;
  let fixture: ComponentFixture<ReservationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
