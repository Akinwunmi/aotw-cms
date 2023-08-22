import { FilterOption, SortOption } from '../components/filters-and-sorting';
import { Layout, Theme } from '../models';

export interface AppState {
  discover: DiscoverState,
  layout: Layout;
  theme: Theme;
}

interface DiscoverState {
  filters: FilterOption[];
  sorting: SortOption[];
}
