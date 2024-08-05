import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, switchMap, take, tap } from 'rxjs';

import {
  Entity,
  EntityRange,
  Layout,
  RouteDiscover,
} from '../../models';
import { EntityService } from '../../services';
import { selectDiscover, selectLayout, selectSelectedYear } from '../../state/selectors';
import { setImageRange } from '../../utils';
import { FilterOption, SortDirection, SortOption } from '../advanced-search';
import { ImageComponent } from '../image';
import { EntityComponent } from '../entity';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [
    EntityComponent,
    ImageComponent,
    NgClass,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly entityService = inject(EntityService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  public parentEntityId = signal('');

  private entities = signal<Entity[]>([]);

  // TODO - Implement applyFilters method
  public filteredEntities: Entity[] = [];

  public gridLayout = true;

  public noImageFound = false;

  private activeFilters: FilterOption[] = [];
  private activeSorting?: SortOption;
  private selectedYear!: number;

  private entities$ = this.entityService.getEntities();
  private selectDiscover$ = this.store.select(selectDiscover);
  private selectLayout$ = this.store.select(selectLayout);
  private selectSelectedYear$ = this.store.select(selectSelectedYear);

  public ngOnInit(): void {
    this.setParentEntityId(this.router.url);

    this.entities$.pipe(
      take(1)
    ).subscribe(entities => {
      this.setEntities(entities);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      tap(url => this.setParentEntityId(url)),
      switchMap(() => this.entities$),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(entities => {
      this.setEntities(entities);
    });

    combineLatest([
      this.selectDiscover$,
      this.selectLayout$,
      this.selectSelectedYear$
    ]).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(([{ filters, sorting, sortDirection }, layout, selectedYear]) => {
      this.activeFilters = filters;
      this.activeSorting = sorting.find(option => option.active);
      this.selectedYear = selectedYear;
      this.filteredEntities = this.filterEntities(this.entities()).map(entity =>
        setImageRange(entity, this.selectedYear)
      );
      this.gridLayout = layout === Layout.Grid;

      // TODO - Fix parent sorting
      this.entities.update(entity => entity.sort((a, b) => {
        const key = this.activeSorting?.label.toLowerCase();
        const nameA = a[key as keyof Entity];
        const nameB = b[key as keyof Entity];
        
        if (!(nameA && nameB) || nameA === nameB) {
          return 0;
        }

        const comparison = sortDirection === SortDirection.Asc
          ? nameA > nameB
          : nameA < nameB;

        return comparison ? 1 : -1;
      }));
      this.cdr.detectChanges();
    });
  }

  private filterEntities(entities: Entity[]): Entity[] {
    return entities.filter(({ altId, id, ranges}) => {
      const isChildEntity = this.isChildEntity(id) || this.isChildEntity(altId);
      if (!ranges || !ranges[0].start) {
        return isChildEntity;
      }

      return isChildEntity && this.selectedYearIsInRange(ranges);
    });
  }

  private isChildEntity(id?: string): boolean {
    if (!id) {
      return false;
    }

    const parentIdLength = this.parentEntityId().split('-').length;
    return id.startsWith(this.parentEntityId()) && id.split('-').length === parentIdLength + 1;
  }

  private selectedYearIsInRange(ranges: EntityRange[]): boolean {
    return !!ranges.find(({ start, end }) =>
      start && start <= this.selectedYear && (!end || end > this.selectedYear)
    );
  }

  private setParentEntityId(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.parentEntityId.set(url[RouteDiscover.Entity]);
  }

  private setEntities(entities: Entity[]): void {
    this.entities.set(entities);
    this.filteredEntities = this.filterEntities(this.entities());
    this.cdr.detectChanges();
  }
}
