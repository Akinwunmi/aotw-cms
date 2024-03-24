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
import {
  AotwChipGroupComponent,
  AotwFormFieldComponent,
  AotwIconComponent,
  Chip
} from '@aotw/ng-components';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { Layout } from '../../models';
import { SharedModule } from '../../shared';
import { setLayout } from '../../state/actions';
import { selectLayout } from '../../state/selectors';
import { SortingComponent } from '../sorting';

import {
  AdvancedSearch,
  FilterOption,
  SortDirection,
  SortOption
} from './advanced-search.model';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [
    SharedModule,
    AotwChipGroupComponent,
    AotwFormFieldComponent,
    AotwIconComponent,
    SortingComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
})
export class AdvancedSearchComponent implements OnDestroy, OnInit {
  @Input()
  public filters: FilterOption[] = [];

  @Input()
  public hideSearch = false;

  @Input()
  public stretch = false;

  @Output()
  public filtersChange = new EventEmitter<FilterOption[]>();

  @Output()
  public sortingChange = new EventEmitter<SortOption[]>();

  @Output()
  public sortDirectionChange = new EventEmitter<SortDirection>();

  public advancedSearchEnum = AdvancedSearch;

  public showAllOptions = true;
  public activeOption?: AdvancedSearch;

  public layoutChips: Chip[] = [
    { id: '0', label: '', icon: Layout.List, active: false, disabled: false },
    { id: '1', label: '', icon: Layout.Grid, active: false, disabled: false }
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

  public openOption(filter: AdvancedSearch): void {
    this.showAllOptions = false;
    this.activeOption = filter;
  }

  public toggleFilter(id: string): void {
    const filter = this.filters.find(filter => filter.id === id);
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
