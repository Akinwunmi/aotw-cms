import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Chip } from '../../models';
import {
  AotwChipGroupComponent,
  AotwFieldComponent,
  AotwIconComponent,
} from '../lib';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AotwChipGroupComponent,
    AotwFieldComponent,
    AotwIconComponent,
  ],
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
