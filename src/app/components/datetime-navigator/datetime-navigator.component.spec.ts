import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeNavigatorComponent } from './datetime-navigator.component';

describe('DatetimeNavigatorComponent', () => {
  let component: DatetimeNavigatorComponent;
  let fixture: ComponentFixture<DatetimeNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DatetimeNavigatorComponent]
    });
    fixture = TestBed.createComponent(DatetimeNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
