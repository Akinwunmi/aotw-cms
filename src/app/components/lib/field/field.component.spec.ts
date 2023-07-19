import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwFieldComponent } from './field.component';

describe('AotwFieldComponent', () => {
  let component: AotwFieldComponent;
  let fixture: ComponentFixture<AotwFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwFieldComponent]
    });
    fixture = TestBed.createComponent(AotwFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
