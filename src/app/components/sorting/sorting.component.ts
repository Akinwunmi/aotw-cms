import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FlagIconComponent } from '@flagarchive/angular';

import { SortDirection, SortOption } from '../advanced-search';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [FlagIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  public options = model<SortOption[]>([]);
  public direction = model(SortDirection.Asc);

  public sortDirectionEnum = SortDirection;

  public setSortDirection(): void {
    this.direction.set(
      this.direction() === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
    );
  }

  public updateOptions(id: string): void {
    this.options.set(this.options().map(option => ({
      ...option,
      active: option.id === id
    })));
  }
}
