import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Step } from '../../models';
import { SharedModule } from '../../shared';
import {
  AotwFieldComponent,
  AotwLabelComponent,
  AotwStepperComponent,
  AotwStepperService
} from '../lib';

import {
  ArchiveLayout,
  CreateFormControls,
  CreateFormStep
} from './create.model';
import { GeneralInfoComponent } from './general-info';
import { LayoutComponent } from './layout';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    SharedModule,
    AotwFieldComponent,
    AotwLabelComponent,
    AotwStepperComponent,
    GeneralInfoComponent,
    LayoutComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public steps!: Step[];
  public activeStep = 0;

  public form!: FormGroup;
  public isGeneralInfoValidated = false;

  private fb = inject(FormBuilder);
  private location = inject(Location);
  private router = inject(Router);
  private stepperService = inject(AotwStepperService);

  public get generalInfo(): string {
    return CreateFormStep.GeneralInfo;
  }

  public get layout(): string {
    return CreateFormStep.Layout;
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      [CreateFormStep.GeneralInfo]: this.fb.group({
        [CreateFormControls.Name]: ['', Validators.required],
        [CreateFormControls.MainCategory]: ['', Validators.required],
        [CreateFormControls.MainTopics]: this.fb.array([
          this.fb.control('', Validators.required),
          this.fb.control('', Validators.required)
        ])
      }),
      [CreateFormStep.Layout]: this.fb.group({
        [CreateFormControls.Layout]: [
          [ArchiveLayout.Main],
          Validators.required
        ]
      })
    });

    const layoutControl = this.form.get([
      CreateFormStep.Layout,
      CreateFormControls.Layout
    ]);
    if (layoutControl) {
      layoutControl.setValue(ArchiveLayout.Main);
    }

    this.steps = Object.keys(this.form.controls).map((control, index) => ({
      label: `CREATE.STEPS.${control}`,
      disabled: index !== 0
    }));
  }

  public validateGeneralInfo(validated: boolean): void {
    this.isGeneralInfoValidated = validated;
    this.steps[1].disabled = !validated;
    this.stepperService.setSteps(this.steps);
  }

  public goToNextStep(): void {
    this.activeStep++;
  }

  public cancel(): void {
    this.location.back();
  }

  public submit(): void {
    // TODO Add BE and connect
    this.router.navigate(['/home']);
  }
}
