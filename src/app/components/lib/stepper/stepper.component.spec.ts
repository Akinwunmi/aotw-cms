import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwStepperComponent } from './stepper.component';

describe('AotwStepperComponent', () => {
  let component: AotwStepperComponent;
  let fixture: ComponentFixture<AotwStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwStepperComponent]
    });
    fixture = TestBed.createComponent(AotwStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
