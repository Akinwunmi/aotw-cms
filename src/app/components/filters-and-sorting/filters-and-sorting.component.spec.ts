import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersAndSortingComponent } from './filters-and-sorting.component';

describe('FiltersAndSortingComponent', () => {
  let component: FiltersAndSortingComponent;
  let fixture: ComponentFixture<FiltersAndSortingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersAndSortingComponent]
    });
    fixture = TestBed.createComponent(FiltersAndSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
