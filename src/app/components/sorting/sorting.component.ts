import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model
} from '@angular/core';
import {
  AotwChipComponent,
  AotwChipGroupComponent,
  AotwIconComponent,
  Chip
} from '@aotw/ng-components';

import { SortDirection, SortOption } from '../advanced-search';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, AotwChipComponent, AotwChipGroupComponent, AotwIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  public options = model<SortOption[]>([]);
  public direction = model(SortDirection.Asc);

  public optionChips = computed(() => (
    this.options().map(({ id, label, active, disabled }) => ({
      id, label, active, disabled
    })) as Chip[]
  ));

  public sortDirectionEnum = SortDirection;

  public setSortDirection(): void {
    this.direction.set(
      this.direction() === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
    );
  }

  public updateOptions(chip: Chip): void {
    this.options.set(this.options().map(option => ({
      ...option,
      active: option.id === chip.id
    })));
  }
}
