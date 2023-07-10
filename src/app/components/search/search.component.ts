import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '../../shared';
import { FiltersComponent } from '../filters';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SharedModule, FiltersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {}
