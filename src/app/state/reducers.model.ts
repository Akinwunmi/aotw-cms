import {
  FilterOption,
  SortDirection,
  SortOption
} from '../components/advanced-search';
import { Layout, Theme } from '../models';

export interface AppState {
  discover: DiscoverState,
  layout: Layout;
  search: SearchState;
  selectedYear: number;
  theme: Theme;
}

export interface DiscoverState extends SearchState {
  activeTopicId: string;
}

export type LayoutState = Pick<AppState, 'layout'>;

export interface SearchState {
  filters: FilterOption[];
  sorting: SortOption[];
  sortDirection: SortDirection;
}

export type SelectedYearState = Pick<AppState, 'selectedYear'>;

export type ThemeState = Pick<AppState, 'theme'>;
