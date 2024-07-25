import { Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AdvancedSearchComponent } from '../../components/advanced-search';
import { DatetimeNavigatorComponent } from '../../components/datetime-navigator';
import { DiscoverHeaderComponent } from '../../components/discover-header';
import { EntityHeaderComponent } from '../../components/entity-header';

export const DISCOVER_IMPORTS: (Type<unknown>)[] = [
  RouterModule,
  AdvancedSearchComponent,
  DatetimeNavigatorComponent,
  DiscoverHeaderComponent,
  EntityHeaderComponent,
  TranslateModule,
];
