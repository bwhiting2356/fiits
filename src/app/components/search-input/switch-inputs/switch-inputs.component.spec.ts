import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchInputsComponent } from './switch-inputs.component';

describe('SwitchInputsComponent', () => {
  let component: SwitchInputsComponent;
  let fixture: ComponentFixture<SwitchInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
