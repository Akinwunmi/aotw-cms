import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Chip } from '../../../models';

@Component({
  selector: 'aotw-lib-chip-group',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chip-group.component.html',
})
export class AotwChipGroupComponent {
  @Input()
  public chips: Chip[] = [];
}
