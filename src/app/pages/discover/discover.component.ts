import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbItem } from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  combineLatest,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';

import {
  FilterOption,
  SortDirection,
  SortOption
} from '../../components/advanced-search';
import { Entity, RouteDiscover } from '../../models';
import { EntityService } from '../../services';
import { setDiscoverState } from '../../state/actions';
import { initialState } from '../../state/reducers';
import { selectDiscover } from '../../state/selectors';

import { DISCOVER_IMPORTS } from './discover.imports';


@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [...DISCOVER_IMPORTS],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly entityService = inject(EntityService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly translate = inject(TranslateService);

  private entityId = signal('');
  private entityNames = computed(() => this.entityId()?.split('-'));

  public entities!: Entity[];
  public mainEntities?: Entity[];
  public activeMainEntityId!: string;

  public activeEntity?: Entity;
  public entitiesBreadcrumb: BreadcrumbItem[] = [];

  public filters: FilterOption[] = [];

  public minYear = 0;
  public maxYear!: number;

  private currentYear = new Date().getFullYear();
  
  private entities$ = this.entityService.getEntities();
  private discoverState$ = this.store.select(selectDiscover).pipe(
    take(1)
  );

  private _sorting: SortOption[] = [];
  public get sorting(): SortOption[] {
    return this._sorting;
  }
  public set sorting(sorting: SortOption[]) {
    this._sorting = sorting;
    this.setState();
  }

  private _sortDirection = SortDirection.Asc;
  public get sortDirection(): SortDirection {
    return this._sortDirection;
  }
  public set sortDirection(sortDirection: SortDirection) {
    this._sortDirection = sortDirection;
    this.setState();
  }

  public ngOnInit(): void {
    this.setEntityIdAndBreadcrumb(this.router.url);

    this.entities$.pipe(
      take(1)
    ).subscribe(entities => {
      this.setEntities(entities);
      this.setMinYear(entities);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      tap(url => this.setEntityIdAndBreadcrumb(url)),
      switchMap(() => this.entities$),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((entities) => {
      this.setEntities(entities);
    });
  }

  public setActiveEntity(id: string): void {
    this.router.navigate(['entity', id], { relativeTo: this.route });
    this.activeMainEntityId = id;
    this.activeEntity = this.entityNames()?.length > 1
      ? this.entities.find(entity => entity.altId === id || entity.id === id)
      : undefined;
    this.setMaxYear();

    this.cdr.detectChanges();
  }

  public setState(): void {
    // structuredClone instead of a spread operator is needed to create a deep copy
    this.store.dispatch(setDiscoverState({
      ...initialState.discover,
      filters: structuredClone(this.filters),
      sorting: structuredClone(this.sorting),
      sortDirection: this.sortDirection
    }));
  }

  private setEntityIdAndBreadcrumb(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    if (url[RouteDiscover.Entity] === undefined) {
      this.discoverState$.pipe(
        take(1),
      ).subscribe(({ activeEntityId }) => {
        this.entityId.set(activeEntityId);
      });
    } else {
      this.entityId.set(url[RouteDiscover.Entity]);
    }

    if (this.entityNames) {
      // set entity id as title and current url,
      // until index of parent entity + entity as link
      this.entitiesBreadcrumb = this.entityNames()?.slice(0, -1).map(entity => ({
        title: entity,
        link: `${rawUrl.slice(0, rawUrl.indexOf(entity))}${entity}`
      } as BreadcrumbItem));
    }

    this.cdr.detectChanges();
  }

  private setEntities(entities: Entity[]): void {
    this.entities = entities;
    this.setFiltersAndSorting();

    this.mainEntities = entities.filter(entity => entity.id.length === 2);
    this.setActiveEntity(this.entityId() || this.mainEntities[0].id);
    this.discoverState$.subscribe(discover => {
      this.store.dispatch(setDiscoverState({
        ...discover,
        activeEntityId: this.entityId(),
      }));
    });

    this.cdr.detectChanges();
  }

  private setFiltersAndSorting(): void {
    combineLatest([
      this.translate.stream(['DISCOVER.HAS_PARENT'], { type: 'country' }),
      this.translate.stream(['COMMON.NAME', 'DISCOVER.PARENT'])
    ]).pipe(
      map(([filterTranslations, sortingTranslations]) => ({
        filters: Object.values(filterTranslations) as string[],
        sorting: Object.values(sortingTranslations) as string[]
      })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(({ filters, sorting }) => {
      this.filters = filters.map((label, index) => ({
        id: String(index),
        label,
        active: false,
        disabled: false
      }));
      this.sorting = sorting.map((label, index) => ({
        id: String(index),
        label,
        firstValue: 'A',
        secondValue: 'Z',
        active: index === 0,
        disabled: false
      }));
    });
  }

  private setMaxYear(): void {
    const ranges = this.activeEntity?.ranges || [];
    const endYear = ranges.slice(-1)[0]?.end;

    this.maxYear = endYear || this.currentYear;
  }

  private setMinYear(entities: Entity[]): void {
    const allRanges = entities.filter(entity => entity.ranges).flatMap(entity => entity.ranges);
    const ranges = this.activeEntity?.ranges || [];
    const startYear = ranges[0]?.start;

    this.minYear = startYear ?? Math.min(...allRanges.map(range =>
      range?.start || this.currentYear
    ));
  }
}
