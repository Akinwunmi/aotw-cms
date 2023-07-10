import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Chip } from '../../models';
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
    { label: '', icon: 'list', size: 'medium', active: false, disabled: false },
    { label: '', icon: 'grid', size: 'medium', active: true, disabled: false },
  ];

  public showSearch = false;

  public toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}
