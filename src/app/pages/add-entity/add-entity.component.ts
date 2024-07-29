import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FlagCardComponent, FlagIconComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldInputComponent } from '../../components/form-field-input';
import { PageHeaderComponent } from '../../components/page-header';
import {
  EntityKey,
  EntityRange,
  EntityRangeKey,
  EntityWithoutBaseId,
  RouteAdmin,
} from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { EntityService } from '../../services';
import { parseEntity } from '../../utils';

import { EntityForm, EntityRangeForm } from './add-entity.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlagCardComponent,
    FlagIconComponent,
    FormFieldInputComponent,
    PageHeaderComponent,
    ReactiveFormsModule,
    TranslateModule,
    TranslationKeyPipe,
  ],
  selector: 'app-add-entity',
  standalone: true,
  styleUrl: './add-entity.component.scss',
  templateUrl: './add-entity.component.html',
})
export class AddEntityComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly entityService = inject(EntityService);
  private readonly router = inject(Router);

  public entityKeyEnum = EntityKey;
  public entityRangeKeyEnum = EntityRangeKey;

  public form = new FormGroup<EntityForm>({
    [EntityKey.Id]: new FormControl(null, [Validators.required]),
    [EntityKey.TranslationKey]: new FormControl(null, [Validators.required]),
    [EntityKey.Type]: new FormControl(null, [Validators.required]),
    [EntityKey.AltId]: new FormControl(null),
    [EntityKey.ImageUrl]: new FormControl(null),
    [EntityKey.Parent]: new FormControl(null),
    [EntityKey.Ranges]: new FormArray<FormGroup<EntityRangeForm>>([]),
  });

  public mode!: string;

  public get rangesFormArray(): FormArray<FormGroup<EntityRangeForm>> {
    return this.form.get(EntityKey.Ranges) as FormArray<FormGroup<EntityRangeForm>>;
  }

  private baseId!: string;

  public ngOnInit(): void {
    const path = this.router.url.slice(1).split('/');
    this.mode = path[RouteAdmin.Mode];

    this.baseId = path[RouteAdmin.Entity];
    this.entityService.getEntityByBaseId(this.baseId).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(entity => {
      const ranges = Object.entries(entity).flatMap(([key, value]) => {
        const formControl = this.form.controls[key as EntityKey];
        if (key === EntityKey.Ranges) {
          return value as EntityRange[];
        }
        if (formControl) {
          formControl.setValue(value);
        }
        return [];
      });
      ranges.forEach(range => {
        this.addRange(range);
      });
      this.cdr.markForCheck();
    });
  }

  public addRange(range?: EntityRange): void {
    const formGroup = new FormGroup<EntityRangeForm>({
      [EntityRangeKey.Start]: new FormControl(
        range?.[EntityRangeKey.Start] ?? null, [Validators.required],
      ),
      [EntityRangeKey.End]: new FormControl(range?.[EntityRangeKey.End] ?? null),
      [EntityRangeKey.ImageUrl]: new FormControl(range?.[EntityRangeKey.ImageUrl] ?? null),
      [EntityRangeKey.Parent]: new FormControl(range?.[EntityRangeKey.Parent] ?? null),
      [EntityRangeKey.TranslationKey]: new FormControl(
        range?.[EntityRangeKey.TranslationKey] ?? null
      ),
      [EntityRangeKey.Type]: new FormControl(range?.[EntityRangeKey.Type] ?? null),
    });
    this.rangesFormArray.push(formGroup);
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
    if (this.form.invalid) {
      return;
    }

    const entity = parseEntity(this.form.value as EntityWithoutBaseId);

    if (this.mode === 'add') {
      this.entityService.addEntity(entity).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
        next: () => {
          this.form.reset();
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.entityService.updateEntityByBaseId(this.baseId, entity).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
