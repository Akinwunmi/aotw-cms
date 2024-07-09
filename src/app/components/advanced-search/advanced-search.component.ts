import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  input,
  model
} from '@angular/core';
import {
  ButtonDirective,
  FlagFormFieldComponent,
  FlagIconComponent,
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { Layout } from '../../models';
import { SHARED_IMPORTS } from '../../shared';
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
    ...SHARED_IMPORTS,
    ButtonDirective,
    FlagFormFieldComponent,
    FlagIconComponent,
    SortingComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
})
export class AdvancedSearchComponent implements OnDestroy, OnInit {
  public hideSearch = input(false);
  public stretch = input(false);

  public filters = model<FilterOption[]>([]);
  public sorting = model<SortOption[]>([]);
  public sortDirection = model<SortDirection>(SortDirection.Asc);

  public advancedSearchEnum = AdvancedSearch;

  public showAllOptions = true;
  public activeOption?: AdvancedSearch;

  public layoutButtons: FilterOption[] = [
    { id: '0', label: '', icon: Layout.List, active: false, disabled: false },
    { id: '1', label: '', icon: Layout.Grid, active: false, disabled: false }
  ];

  private store = inject(Store);

  private selectLayout$ = this.store.select(selectLayout);
  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.selectLayout$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(layout => {
      this.layoutButtons.forEach(button => button.active = button.icon === layout);
    });
  }

  public setLayout(button: FilterOption): void {
    this.store.dispatch(setLayout({ layout: button.icon as Layout }));
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
    const filter = this.filters().find(filter => filter.id === id);
    if (filter) {
      filter.active = !filter.active;
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
