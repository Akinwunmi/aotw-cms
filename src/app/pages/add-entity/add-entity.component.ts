import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FlagCardComponent, FlagIconComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldInputComponent } from '../../components/form-field-input';
import { PageHeaderComponent } from '../../components/page-header';
import { EntityWithoutBaseId } from '../../models';
import { EntityService } from '../../services';

import { EntityForm, EntityRangeForm, Field } from './add-entity.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlagCardComponent,
    FlagIconComponent,
    FormFieldInputComponent,
    PageHeaderComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  selector: 'app-add-entity',
  standalone: true,
  styleUrl: './add-entity.component.scss',
  templateUrl: './add-entity.component.html',
})
export class AddEntityComponent {
  private readonly entityService = inject(EntityService);

  public fieldEnum = Field;

  public form = new FormGroup<EntityForm>({
    [Field.Id]: new FormControl(null, [Validators.required]),
    [Field.AltId]: new FormControl(null),
    [Field.Parent]: new FormControl(null),
    [Field.ImageUrl]: new FormControl(null),
    [Field.Type]: new FormControl(null, [Validators.required]),
    [Field.Ranges]: new FormArray<FormGroup<EntityRangeForm>>([]),
  });

  public get rangesFormArray(): FormArray<FormGroup<EntityRangeForm>> {
    return this.form.get(Field.Ranges) as FormArray<FormGroup<EntityRangeForm>>;
  }

  public addRange(): void {
    const range = new FormGroup<EntityRangeForm>({
      [Field.Start]: new FormControl(null, [Validators.required]),
      [Field.End]: new FormControl(null),
      [Field.Id]: new FormControl(null),
      [Field.ImageUrl]: new FormControl(null),
      [Field.Type]: new FormControl(null),
    });
    this.rangesFormArray.push(range);
  }

  public removeRange(index: number): void {
    this.rangesFormArray.removeAt(index);
  }

  public getControl(key: string, form?: FormGroup): FormControl {
    if (form) {
      return form.get(key) as FormControl;
    }
    return this.form.get(key) as FormControl;
  }

  public upload(): void {
    if (!this.form.valid) {
      return;
    }

    const entity = this.form.value as EntityWithoutBaseId;
    Object.keys(entity).forEach((rawKey) => {
      const key = rawKey as keyof EntityWithoutBaseId;
      const isEmptyArray = Array.isArray(entity[key]) && entity[key]?.length === 0;
      const isNull = entity[key] === null;
      if (isEmptyArray || isNull) {
        delete entity[key];
      }
    });
    this.entityService.addEntity(entity).subscribe({
      next: () => {
        this.form.reset();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
