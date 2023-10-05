import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SharedModule } from '../../../shared';

import { Step } from './stepper.model';
import { AotwStepperService } from './stepper.service';

@Component({
  selector: 'aotw-lib-stepper',
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AotwStepperComponent implements OnDestroy, OnInit {
  @Input()
  public activeStep = 0;

  @Input()
  public steps: Step[] = [];

  @Output()
  public activeStepChange = new EventEmitter<number>();

  private cdr = inject(ChangeDetectorRef);
  private stepperService = inject(AotwStepperService);

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.stepperService.steps$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(steps => {
      this.steps = steps;
      this.cdr.detectChanges();
    });
  }

  public setActiveStep(index: number): void {
    this.activeStep = index;
    this.activeStepChange.emit(this.activeStep);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
