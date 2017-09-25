import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNavigateComponent } from './search-navigate.component';

describe('SearchNavigateComponent', () => {
  let component: SearchNavigateComponent;
  let fixture: ComponentFixture<SearchNavigateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
