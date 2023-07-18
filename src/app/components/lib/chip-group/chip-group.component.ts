import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';

import { Chip } from '../../../models';
import { SharedModule } from '../../../shared';

@Component({
  selector: 'aotw-lib-chip-group',
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chip-group.component.html',
})
export class AotwChipGroupComponent {
  @Input()
  public chips: Chip[] = [];

  @Input()
  public size: 'small' | 'medium' = 'medium';
}
