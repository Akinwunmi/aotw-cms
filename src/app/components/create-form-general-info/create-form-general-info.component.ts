import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  AotwFormFieldComponent,
  AotwIconComponent,
  AotwLabelComponent
} from '@aotw/ng-components';
import { Subject, takeUntil } from 'rxjs';

import { CreateFormControls } from '../../models';
import { SharedModule } from '../../shared';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    SharedModule,
    AotwFormFieldComponent,
    AotwIconComponent,
    AotwLabelComponent
  ],
  templateUrl: './create-form-general-info.component.html',
  styleUrls: ['./create-form-general-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFormGeneralInfoComponent implements OnDestroy, OnInit {
  @Output()
  public validated = new EventEmitter<boolean>();

  public form!: FormGroup;

  public createFormControlsEnum = CreateFormControls;

  private controlContainer = inject(ControlContainer);
  private fb = inject(FormBuilder);

  private unsubscribe$ = new Subject<void>();

  public get nameControl(): AbstractControl {
    return this.form.get(CreateFormControls.Name) as AbstractControl;
  }

  public get mainCategoryControl(): AbstractControl {
    return this.form.get(CreateFormControls.MainCategory) as AbstractControl;
  }

  public get mainTopicsControl(): AbstractControl {
    return this.form.get(CreateFormControls.MainTopics) as AbstractControl;
  }

  public get topics(): FormControl[] {
    return (
      this.form.get(CreateFormControls.MainTopics) as FormArray
    ).controls as FormControl[];
  }

  public ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.form.statusChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(status => {
      this.validated.emit(status === 'VALID');
    });
  }

  public addTopic(): void {
    this.topics.push(this.fb.control(''));
  }

  public removeTopic(index: number): void {
    this.topics.splice(index, 1);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
