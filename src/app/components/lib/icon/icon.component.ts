import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aotw-lib-icon',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class AotwIconComponent {
  @Input()
  public name?: string;

  @Input()
  public size = 'small';
}
