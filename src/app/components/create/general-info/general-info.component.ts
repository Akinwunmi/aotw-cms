import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

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
export class GeneralInfoComponent implements OnInit {
  public form!: FormGroup;

  private controlContainer = inject(ControlContainer);
  private fb = inject(FormBuilder);

  public get topics(): FormControl[] {
    return (
      this.form.get(CreateFormControls.MainTopics) as FormArray
    ).controls as FormControl[];
  }

  public ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }

  public addTopic(): void {
    this.topics.push(this.fb.control(''));
  }

  public removeTopic(index: number): void {
    this.topics.splice(index, 1);
  }
}
