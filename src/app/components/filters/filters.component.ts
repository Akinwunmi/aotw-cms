import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AotwChipGroupComponent, AotwFieldComponent, AotwIconComponent } from '../lib';

import { Chip } from '../../models';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    AotwChipGroupComponent,
    AotwFieldComponent,
    AotwIconComponent
  ],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  public filterChips: Chip[] = [
    { label: '', icon: 'list', size: 'medium', active: false, disabled: false },
    { label: '', icon: 'grid', size: 'medium', active: true, disabled: false }
  ]

  public showSearch = false;

  public toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}