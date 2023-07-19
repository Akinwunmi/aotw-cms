import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Chip, Layout } from '../../models';
import { SharedModule } from '../../shared';
import {
  AotwChipGroupComponent,
  AotwFieldComponent,
  AotwIconComponent,
} from '../lib';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    SharedModule,
    AotwChipGroupComponent,
    AotwFieldComponent,
    AotwIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  public filterChips: Chip[] = [
    { label: '', icon: Layout.List, active: false, disabled: false },
    { label: '', icon: Layout.Grid, active: true, disabled: false },
  ];

  public showSearch = false;

  // TODO Add state management for active layout
  private activeLayout!: Layout;

  public setLayout(chip: Chip): void {
    this.activeLayout = chip.icon as Layout;
  }

  public toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}
