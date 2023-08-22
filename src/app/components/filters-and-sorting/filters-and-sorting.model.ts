export enum FiltersAndSorting {
  Filters = 'filters',
  Search = 'search'
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export interface FilterOption {
  label: string;
  active: boolean;
  disabled: boolean;
}

export interface SortOption extends FilterOption {
  firstValue: string;
  secondValue: string;
  direction: SortDirection;
}
