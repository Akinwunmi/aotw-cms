import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup
} from '@angular/forms';
import { AotwFieldComponent, AotwLabelComponent } from '@aotw/lib-ng';

import { ArchiveLayout, CreateFormControls } from '../../models';
import { SharedModule } from '../../shared';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SharedModule, AotwFieldComponent, AotwLabelComponent],
  templateUrl: './create-form-layout.component.html',
  styleUrls: ['./create-form-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFormLayoutComponent implements OnInit {
  public form!: FormGroup;

  public archiveLayoutEnum = ArchiveLayout;
  public createFormControlsEnum = CreateFormControls;

  private controlContainer = inject(ControlContainer);

  public get layouts(): FormControl[] {
    return this.form.get(CreateFormControls.Layout)?.value as FormControl[];
  }

  public ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }
}
