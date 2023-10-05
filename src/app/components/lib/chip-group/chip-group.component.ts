import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { SharedModule } from '../../../shared';
import { Chip } from '../chip';

@Component({
  selector: 'aotw-lib-chip-group',
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chip-group.component.html',
})
export class AotwChipGroupComponent implements OnInit {
  @Input()
  public chips: Chip[] = [];

  @Input()
  public size: 'small' | 'medium' = 'medium';

  @Output()
  public activeChip = new EventEmitter<Chip>();

  public ngOnInit(): void {
    const activeChip = this.chips.find(chip => chip.active);
    if (!activeChip) {
      return;
    }

    this.emitActiveChip(activeChip);
  }

  public emitActiveChip(chip: Chip): void {
    this.activeChip.emit(chip);
  }
}
