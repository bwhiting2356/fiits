import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputContainerComponent } from './search-input-container.component';

describe('SearchInputContainerComponent', () => {
  let component: SearchInputContainerComponent;
  let fixture: ComponentFixture<SearchInputContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInputContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
