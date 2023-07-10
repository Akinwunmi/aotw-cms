import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';

import { SharedModule } from '../../../shared';

@Component({
  selector: 'aotw-lib-dynamic-text',
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.scss'],
})
export class AotwDynamicTextComponent {
  @Input()
  public alignment?: 'left' | 'right';
}
