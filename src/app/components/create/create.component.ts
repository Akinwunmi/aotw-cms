import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ArchiveData, Step } from '../../models';
import { SharedModule } from '../../shared';
import {
  AotwFieldComponent,
  AotwLabelComponent,
  AotwStepperComponent,
  AotwStepperService
} from '../lib';

import {
  ArchiveLayout,
  CreateForm,
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

  public form!: FormGroup<CreateForm>;
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
        [CreateFormControls.Name]: ['', [
          Validators.required,
          Validators.minLength(2)
        ]],
        [CreateFormControls.MainCategory]: ['', [
          Validators.required,
          Validators.minLength(2)
        ]],
        [CreateFormControls.MainTopics]: this.fb.array([
          this.fb.control('', [
            Validators.required,
            Validators.minLength(2)
          ]),
          this.fb.control('', [
            Validators.required,
            Validators.minLength(2)
          ])
        ])
      }),
      [CreateFormStep.Layout]: this.fb.group({
        [CreateFormControls.Layout]: [
          [ArchiveLayout.Main],
          Validators.required
        ]
      })
    } as CreateForm);

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
    const parsedCreateForm = this.parseFormData(this.form.value) as ArchiveData;
    console.log(parsedCreateForm);
    this.router.navigate(['/home']);
  }

  private parseFormData(object: Object) {
    const parsedForm = {};
    Object.entries(object).forEach(([key, value]) => {
      const parsedKey = key.toLowerCase().replace(/([-_][a-z])/g, substring => this.parseKey(substring)) as keyof Object;
      parsedForm[parsedKey] = typeof value === 'object'
        ? this.parseFormData(value)
        : value;
    });
    return parsedForm;
  }

  private parseKey(key: string) {
    return key.slice(-1).toUpperCase();
  }
}
