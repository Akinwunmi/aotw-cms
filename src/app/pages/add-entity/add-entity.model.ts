import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { EntityType } from '../../models';

export enum Field {
  AltId = 'altId',
  End = 'end',
  Id = 'id',
  ImageUrl = 'imageUrl',
  Parent = 'parent',
  Ranges = 'ranges',
  Start = 'start',
  Type = 'type',
}

export interface EntityForm {
  [Field.Id]: FormControl<string | null>;
  [Field.AltId]: FormControl<string | null>;
  [Field.Parent]: FormControl<string | null>;
  [Field.ImageUrl]: FormControl<string | null>;
  [Field.Type]: FormControl<EntityType | null>;
  [Field.Ranges]: FormArray<FormGroup<EntityRangeForm>>;
}

export interface EntityRangeForm {
  [Field.Start]: FormControl<string | null>;
  [Field.End]: FormControl<string | null>;
  [Field.Id]: FormControl<string | null>;
  [Field.ImageUrl]: FormControl<string | null>;
  [Field.Type]: FormControl<string | null>;
}
