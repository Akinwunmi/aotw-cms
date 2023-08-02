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

import { SharedModule } from '../../../shared';
import { AotwFieldComponent, AotwLabelComponent } from '../../lib';
import { ArchiveLayout, CreateFormControls } from '../create.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SharedModule, AotwFieldComponent, AotwLabelComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
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
