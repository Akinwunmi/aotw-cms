import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aotw-lib-list-item',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-item.component.html',
})
export class AotwListItemComponent {
  @Input()
  public active = false;

  @Input()
  public disabled = false;
}
