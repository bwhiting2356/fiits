import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultErrorComponent } from './search-result-error.component';

describe('SearchResultErrorComponent', () => {
  let component: SearchResultErrorComponent;
  let fixture: ComponentFixture<SearchResultErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
