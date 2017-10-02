import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLayerComponent } from './nav-layer.component';

describe('NavLayerComponent', () => {
  let component: NavLayerComponent;
  let fixture: ComponentFixture<NavLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
