import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { SharedModule } from '../../../shared';

@Component({
  selector: 'aotw-lib-stepper',
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AotwStepperComponent {
  @Input()
  public activeStep = 0;

  @Input()
  public steps: string[] = [];

  @Output()
  public activeStepChange = new EventEmitter<number>();
  
  public setActiveStep(index: number): void {
    this.activeStep = index;
    this.activeStepChange.emit(this.activeStep);
  }
}
