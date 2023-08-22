import { Component, EventEmitter, Input, Output, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AotwIconComponent } from '../../lib';
import { SortDirection, SortOption } from '../filters-and-sorting.model';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, AotwIconComponent],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  private _options = signal<SortOption[]>([]);
  public get options(): WritableSignal<SortOption[]> {
    return this._options;
  }
  @Input()
  public set options(options: SortOption[]) {
    this._options.set(options);
  }

  @Output()
  public optionsChange = new EventEmitter<SortOption[]>();

  // Update active sort when sorting variable changed
  public activeOption = computed(() => {
    const activeOption = this.options().find(option => option.active);
    if (!activeOption) {
      return '';
    }

    let suffix = activeOption.direction === SortDirection.Asc
      ? `${activeOption.firstValue}-${activeOption.secondValue}`
      : `${activeOption.secondValue}-${activeOption.firstValue}`;

    return `${activeOption.label}: ${suffix}`;
  });

  public setSort(): void {
    let newIndex = -1;

    this.options.update(options => {
      options.forEach((option, index) => {
        if (!option.active) {
          return;
        }

        if (option.direction === SortDirection.Asc) {
          option.direction = SortDirection.Desc;
        } else {
          newIndex = index >= options.length - 1 ? 0 : index + 1;

          option.active = false;
          option.direction = SortDirection.Asc;
        }
      });

      if (options[newIndex]) {
        options[newIndex].active = true;
        options[newIndex].direction = SortDirection.Asc;
      }

      this.optionsChange.emit(options);
      return options;
    });
  }
}
