import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '../../shared';
import { FiltersAndSortingComponent } from '../filters-and-sorting';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SharedModule, FiltersAndSortingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {}
