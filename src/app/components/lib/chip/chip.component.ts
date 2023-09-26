import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostBinding,
  Input,
} from '@angular/core';

import { SharedModule } from '../../../shared';

@Component({
  selector: 'aotw-lib-chip',
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class AotwChipComponent {
  @Input()
  public active = false;

  @HostBinding('class.disabled')
  @Input()
  public disabled = false;

  @Input()
  public size?: 'small' | 'medium';
}
