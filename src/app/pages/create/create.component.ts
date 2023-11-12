import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AotwFormFieldComponent,
  AotwLabelComponent,
  AotwStepperComponent,
  AotwStepperService,
  Step
} from '@aotw/ng-components';
import { TranslateService } from '@ngx-translate/core';
import { map, Subject, takeUntil } from 'rxjs';

import {
  CreateFormGeneralInfoComponent
} from '../../components/create-form-general-info';
import { CreateFormLayoutComponent } from '../../components/create-form-layout';
import {
  ArchiveData,
  ArchiveLayout,
  CreateForm,
  CreateFormControls,
  CreateFormStep
} from '../../models';
import { SharedModule } from '../../shared';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    SharedModule,
    AotwFormFieldComponent,
    AotwLabelComponent,
    AotwStepperComponent,
    CreateFormGeneralInfoComponent,
    CreateFormLayoutComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnDestroy, OnInit {
  public steps!: Step[];
  public activeStep = 0;

  public form!: FormGroup<CreateForm>;
  public isGeneralInfoValidated = false;

  private fb = inject(FormBuilder);
  private location = inject(Location);
  private router = inject(Router);
  private stepperService = inject(AotwStepperService);
  private translate = inject(TranslateService);

  private unsubscribe$ = new Subject<void>();

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

    this.setSteps();
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

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private parseFormData(object: Object): Object {
    const parsedForm = {};
    Object.entries(object).forEach(([key, value]) => {
      const parsedKey = key.toLowerCase().replace(/([-_][a-z])/g, substring =>
        this.parseKey(substring)) as keyof Object;
      parsedForm[parsedKey] = typeof value === 'object'
        ? this.parseFormData(value)
        : value;
    });
    return parsedForm;
  }

  private parseKey(key: string): string {
    return key.slice(-1).toUpperCase();
  }

  private setSteps(): void {
    const stepLabels = Object.keys(this.form.controls).map(control =>
      `CREATE.STEPS.${control}`
    );
    this.translate.stream(stepLabels).pipe(
      map(translations => Object.values(translations) as string[]),
      takeUntil(this.unsubscribe$)
    ).subscribe(labels => {
      this.steps = labels.map((label, index) => ({
        label,
        disabled: index !== 0
      }));
    });
  }
}
