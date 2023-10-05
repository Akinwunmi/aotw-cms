import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Step } from './stepper.model';

@Injectable({
  providedIn: 'root'
})
export class AotwStepperService {
  public steps$ = new Subject<Step[]>();

  public setSteps(steps: Step[]): void {
    return this.steps$.next(steps);
  }
}
