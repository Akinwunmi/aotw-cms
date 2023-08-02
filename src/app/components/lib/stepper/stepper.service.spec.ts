import { TestBed } from '@angular/core/testing';

import { AotwStepperService } from './stepper.service';

describe('AotwStepperService', () => {
  let service: AotwStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AotwStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
