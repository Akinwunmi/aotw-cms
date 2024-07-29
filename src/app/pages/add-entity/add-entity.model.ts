import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { EntityKey, EntityRangeKey, EntityType } from '../../models';

export interface EntityForm {
  [EntityKey.Id]: FormControl<string | null>;
  [EntityKey.TranslationKey]: FormControl<string | null>;
  [EntityKey.Type]: FormControl<EntityType | null>;
  [EntityKey.AltId]: FormControl<string | null>;
  [EntityKey.ImageUrl]: FormControl<string | null>;
  [EntityKey.Parent]: FormControl<string | null>;
  [EntityKey.Ranges]: FormArray<FormGroup<EntityRangeForm>>;
}

export interface EntityRangeForm {
  [EntityRangeKey.Start]: FormControl<number | null>;
  [EntityRangeKey.End]: FormControl<number | null>;
  [EntityRangeKey.ImageUrl]: FormControl<string | null>;
  [EntityRangeKey.Parent]: FormControl<string | null>;
  [EntityRangeKey.TranslationKey]: FormControl<string | null>;
  [EntityRangeKey.Type]: FormControl<string | null>;
}
