import {
  FilterOption,
  SortDirection,
  SortOption
} from '../components/advanced-search';
import { Layout, Theme } from '../models';

export interface AppState {
  discover: DiscoverState,
  layout: Layout;
  selectedYear: number;
  theme: Theme;
}

interface DiscoverState {
  filters: FilterOption[];
  sorting: SortOption[];
  sortDirection: SortDirection;
}
