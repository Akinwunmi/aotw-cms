import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlagFormFieldComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationKeyPipe } from '../../pipes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagFormFieldComponent, ReactiveFormsModule, TranslateModule, TranslationKeyPipe],
  selector: 'app-form-field-input',
  standalone: true,
  styleUrl: './form-field-input.component.scss',
  templateUrl: './form-field-input.component.html',
})
export class FormFieldInputComponent {
  public control = input.required<FormControl>();
  public translationKey = input.required<string>();
  public hasInfoMessage = input(false);
  public required = input(false);
  public type = input('text');

  public id = crypto.randomUUID();
}
