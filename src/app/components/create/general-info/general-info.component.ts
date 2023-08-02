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
import { Subject, takeUntil } from 'rxjs';

import { SharedModule } from '../../../shared';
import {
  AotwFieldComponent,
  AotwIconComponent,
  AotwLabelComponent
} from '../../lib';
import { CreateFormControls } from '../create.model';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    SharedModule,
    AotwFieldComponent,
    AotwIconComponent,
    AotwLabelComponent
  ],
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralInfoComponent implements OnDestroy, OnInit {
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
