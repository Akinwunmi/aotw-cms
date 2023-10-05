import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { SortDirection, SortOption } from '../advanced-search';
import {
  AotwChipComponent,
  AotwChipGroupComponent,
  AotwIconComponent,
  Chip
} from '../lib';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, AotwChipComponent, AotwChipGroupComponent, AotwIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {
  @Input()
  public options: SortOption[] = [];

  @Input()
  public direction = SortDirection.Asc;

  @Output()
  public optionsChange = new EventEmitter<SortOption[]>();

  @Output()
  public directionChange = new EventEmitter<SortDirection>();

  public optionChips: Chip[] = [];

  public sortDirectionEnum = SortDirection;

  public ngOnInit(): void {
    this.optionChips = this.options.map(
      ({ label, active, disabled }) => ({
        label, active, disabled
      } as Chip)
    );
  }

  public setSortDirection(): void {
    this.direction = this.direction === SortDirection.Asc
      ? SortDirection.Desc
      : SortDirection.Asc;
    this.directionChange.emit(this.direction);
  }

  public updateOptions(chip: Chip): void {
    this.options = this.options.map(option => ({
      ...option,
      active: option.label === chip.label
    }));
    this.optionsChange.emit(this.options);
  }
}
