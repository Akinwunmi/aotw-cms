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
import { BreadcrumbItem } from '@aotw/ng-components';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  combineLatest,
  filter,
  map,
  switchMap,
  take
} from 'rxjs';

import {
  FilterOption,
  SortDirection,
  SortOption
} from '../../components/advanced-search';
import { ArchiveTopics, RouteDiscover, Topic } from '../../models';
import { ArchiveService } from '../../services';
import { setDiscoverState } from '../../state/actions';
import { initialState } from '../../state/reducers';
import { selectDiscover } from '../../state/selectors';

import { DISCOVER_IMPORTS } from './discover.imports';


@Component({
  selector: 'app-discover',
  standalone: true,
  imports: DISCOVER_IMPORTS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public archiveData!: ArchiveTopics;

  public mainTopics?: Topic[];
  public activeMainTopicId!: string;

  public activeTopic?: Topic;
  public topicsBreadcrumb: BreadcrumbItem[] = [];

  public filters: FilterOption[] = [];

  public minYear = 0;
  public maxYear!: number;

  private archiveService = inject(ArchiveService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private translate = inject(TranslateService);

  private topicId = signal('');
  private topicNames = computed(() => this.topicId()?.split('-'));

  private currentYear = new Date().getFullYear();

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
    this.getArchiveData(this.router.url);
    const getArchive$ = this.archiveService.getArchive();

    getArchive$.pipe(
      take(1)
    ).subscribe(archiveData => {
      this.setArchiveData(archiveData);
      this.setMinYear(archiveData.topics);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      switchMap(url => {
        this.getArchiveData(url);
        return getArchive$;
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(archiveData => {
      this.setArchiveData(archiveData);
    });
  }

  public setActiveTopic(id: string): void {
    this.router.navigate(['topic', id], { relativeTo: this.route });
    this.activeMainTopicId = id;
    this.activeTopic = this.topicNames()?.length > 1
      ? this.archiveData.topics.find(topic => topic.altId === id || topic.id === id)
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

  private getArchiveData(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    if (url[RouteDiscover.Topic] === undefined) {
      this.discoverState$.subscribe(({ activeTopicId }) => {
        this.topicId.set(activeTopicId);
      });
    } else {
      this.topicId.set(url[RouteDiscover.Topic]);
    }

    if (this.topicNames) {
      // set topic id as title and current url,
      // until index of parent topic + topic as link
      this.topicsBreadcrumb = this.topicNames()?.slice(0, -1).map(topic => ({
        title: topic,
        link: `${rawUrl.slice(0, rawUrl.indexOf(topic))}${topic}`
      } as BreadcrumbItem));
    }

    this.cdr.detectChanges();
  }

  private setArchiveData(archiveData: ArchiveTopics): void {
    this.archiveData = archiveData;
    const { topics, parentType } = this.archiveData;

    this.setFiltersAndSorting(parentType);

    this.mainTopics = topics.filter(topic => topic.id.length === 2);
    this.setActiveTopic(this.topicId() || this.mainTopics[0].id);
    this.discoverState$.subscribe(discover => {
      this.store.dispatch(setDiscoverState({
        ...discover,
        activeTopicId: this.topicId(),
      }));
    });

    this.cdr.detectChanges();
  }

  private setFiltersAndSorting(parentType?: string): void {
    combineLatest([
      this.translate.stream(['DISCOVER.HAS_PARENT'], { type: parentType?.toLowerCase() }),
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
    const ranges = this.activeTopic?.ranges || [];
    const endYear = ranges.slice(-1)[0]?.end;

    this.maxYear = endYear || this.currentYear;
  }

  private setMinYear(topics: Topic[]): void {
    const allRanges = topics.filter(topic => topic.ranges).flatMap(topic => topic.ranges);
    const ranges = this.activeTopic?.ranges || [];
    const startYear = ranges[0]?.start;

    this.minYear = startYear ?? Math.min(...allRanges.map(range =>
      range?.start || this.currentYear
    ));
  }
}
