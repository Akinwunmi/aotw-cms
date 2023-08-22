import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  WritableSignal,
  computed,
  inject,
  signal
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

import { FilterOption, FiltersAndSorting, SortDirection, SortOption } from './filters-and-sorting.model';

@Component({
  selector: 'app-filters-and-sorting',
  standalone: true,
  imports: [
    SharedModule,
    AotwChipGroupComponent,
    AotwFieldComponent,
    AotwIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filters-and-sorting.component.html',
  styleUrls: ['./filters-and-sorting.component.scss'],
})
export class FiltersAndSortingComponent implements OnDestroy, OnInit {
  @Input()
  public filters: FilterOption[] = [];

  private _sorting = signal<SortOption[]>([]);
  public get sorting(): WritableSignal<SortOption[]> {
    return this._sorting;
  }
  @Input()
  public set sorting(sorting: SortOption[]) {
    this._sorting.set(sorting);
  }

  @Output()
  public activeLayout = new EventEmitter<Layout>();

  @Output()
  public filtersChange = new EventEmitter<FilterOption[]>();

  public filtersAndSortingEnum = FiltersAndSorting;

  public showAllOptions = true;
  public activeOption?: FiltersAndSorting;

  public layoutChips: Chip[] = [
    { label: '', icon: Layout.List, active: false, disabled: false },
    { label: '', icon: Layout.Grid, active: false, disabled: false },
  ];

  public activeSort = computed(() => {
    const activeSorting = this.sorting().find(sort => sort.active);
    if (!activeSorting) {
      return '';
    }

    let suffix = activeSorting.direction === SortDirection.Asc
      ? `${activeSorting.firstValue}-${activeSorting.secondValue}`
      : `${activeSorting.secondValue}-${activeSorting.firstValue}`;
    return `${activeSorting.label}: ${suffix}`;
  });

  private store = inject(Store);

  private unsubscribe$ = new Subject<void>();
  private selectLayout$ = this.store.select(selectLayout);

  private nextSortIndex = -1;

  public ngOnInit(): void {
    this.selectLayout$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(layout => {
      this.layoutChips.forEach(chip => chip.active = chip.icon === layout);
      this.activeLayout.emit(layout);
    });
  }

  public setLayout(chip: Chip): void {
    this.store.dispatch(setLayout({ layout: chip.icon as Layout }));
  }

  public setSort(): void {
    let currentIndex = -1;
    let newIndex = -1;

    this.sorting.update(sorting => {
      sorting.forEach((sort, index) => {
        if (sort.active) {
          currentIndex = index;
          if (sort.direction === SortDirection.Desc) {
            newIndex = currentIndex >= sorting.length - 1 ? 0 : currentIndex + 1;

            sort.active = false;
            sort.direction = SortDirection.Asc;
          } else {
            sort.direction = SortDirection.Desc;
          }
        }
        if (sorting[newIndex]) {
          sorting[newIndex].active = true;
          sorting[newIndex].direction = SortDirection.Asc;
        }
      });

      return sorting;
    });
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
