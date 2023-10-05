import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '../../shared';
import { AdvancedSearchComponent } from '../../components/advanced-search';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SharedModule, AdvancedSearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {}
