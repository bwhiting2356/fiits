import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginInputComponent } from './origin-input.component';

describe('OriginInputComponent', () => {
  let component: OriginInputComponent;
  let fixture: ComponentFixture<OriginInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
