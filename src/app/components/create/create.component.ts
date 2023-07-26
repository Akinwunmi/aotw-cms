import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared';
import {
  AotwFieldComponent,
  AotwLabelComponent,
  AotwStepperComponent
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
  public steps!: string[];
  public activeStep = 0;

  public form!: FormGroup;
  public isCurrentFormValidated = false;

  private fb = inject(FormBuilder);
  private location = inject(Location);
  private router = inject(Router);

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

    this.steps = Object.keys(this.form.controls).map(control =>
      `CREATE.STEPS.${control}`
    );
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
