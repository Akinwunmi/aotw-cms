import { Type } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancedSearchComponent } from '../../components/advanced-search';
import { DatetimeNavigatorComponent } from '../../components/datetime-navigator';
import { DiscoverHeaderComponent } from '../../components/discover-header';
import { TopicHeaderComponent } from '../../components/topic-header';
import { SharedModule } from '../../shared';

export const DISCOVER_IMPORTS: (Type<unknown>)[] = [
  SharedModule,
  RouterModule,
  AdvancedSearchComponent,
  DatetimeNavigatorComponent,
  DiscoverHeaderComponent,
  TopicHeaderComponent,
];
