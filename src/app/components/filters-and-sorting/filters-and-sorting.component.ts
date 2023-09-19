import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { Chip, Layout } from '../../models';
import { SharedModule } from '../../shared';
import { setLayout } from '../../state/actions';
import { selectLayout } from '../../state/selectors';
import {
  AotwChipGroupComponent,
  AotwFieldComponent,
  AotwIconComponent,
} from '../lib';

import {
  FilterOption,
  FiltersAndSorting,
  SortDirection,
  SortOption
} from './filters-and-sorting.model';
import { SortingComponent } from './sorting';

@Component({
  selector: 'app-filters-and-sorting',
  standalone: true,
  imports: [
    SharedModule,
    AotwChipGroupComponent,
    AotwFieldComponent,
    AotwIconComponent,
    SortingComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filters-and-sorting.component.html',
  styleUrls: ['./filters-and-sorting.component.scss'],
})
export class FiltersAndSortingComponent implements OnDestroy, OnInit {
  @Input()
  public filters: FilterOption[] = [];

  @Output()
  public filtersChange = new EventEmitter<FilterOption[]>();

  @Output()
  public sortingChange = new EventEmitter<SortOption[]>();

  @Output()
  public sortDirectionChange = new EventEmitter<SortDirection>();

  public filtersAndSortingEnum = FiltersAndSorting;

  public showAllOptions = true;
  public activeOption?: FiltersAndSorting;

  public layoutChips: Chip[] = [
    { label: '', icon: Layout.List, active: false, disabled: false },
    { label: '', icon: Layout.Grid, active: false, disabled: false },
  ];

  private store = inject(Store);

  private unsubscribe$ = new Subject<void>();
  private selectLayout$ = this.store.select(selectLayout);

  // TODO - Extract emit from setter to avoid double call
  private _sorting: SortOption[] = [];
  public get sorting(): SortOption[] {
    return this._sorting;
  }
  @Input()
  public set sorting(sorting: SortOption[]) {
    this.sortingChange.emit(sorting);
    this._sorting = sorting;
  }

  // TODO - Extract emit from setter to avoid double call
  private _sortDirection = SortDirection.Asc;
  public get sortDirection(): SortDirection {
    return this._sortDirection;
  }
  @Input()
  public set sortDirection(sortDirection: SortDirection) {
    this._sortDirection = sortDirection;
    this.sortDirectionChange.emit(this.sortDirection);
  }

  public ngOnInit(): void {
    this.selectLayout$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(layout => {
      this.layoutChips.forEach(chip => chip.active = chip.icon === layout);
    });
  }

  public setLayout(chip: Chip): void {
    this.store.dispatch(setLayout({ layout: chip.icon as Layout }));
  }

  public closeOption(): void {
    this.showAllOptions = true;
    this.activeOption = undefined;
  }

  public openOption(filter: FiltersAndSorting): void {
    this.showAllOptions = false;
    this.activeOption = filter;
  }

  public toggleFilter(label: string): void {
    const filter = this.filters.find(filter => filter.label === label);
    if (filter) {
      filter.active = !filter.active;
    }

    this.filtersChange.emit(this.filters);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
