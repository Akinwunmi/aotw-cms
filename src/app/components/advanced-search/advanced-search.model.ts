export enum AdvancedSearch {
  Filters = 'filters',
  Search = 'search',
  Sort = 'sort'
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export interface FilterOption {
  id: string;
  label: string;
  active: boolean;
  disabled: boolean;
}

export interface SortOption extends FilterOption {
  firstValue: string;
  secondValue: string;
}
