import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule
} from '@angular/router';
import { BreadcrumbItem } from '@aotw/ng-components';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  combineLatest,
  filter,
  map,
  Subject,
  switchMap,
  take,
  takeUntil
} from 'rxjs';

import {
  FilterOption,
  AdvancedSearchComponent,
  SortDirection,
  SortOption
} from '../../components/advanced-search';
import { DatetimeNavigatorComponent } from '../../components/datetime-navigator';
import { DiscoverHeaderComponent } from '../../components/discover-header';
import { TopicHeaderComponent } from '../../components/topic-header';
import { ArchiveTopics, RouteDiscover, Topic } from '../../models';
import { ArchiveService } from '../../services';
import { SharedModule } from '../../shared';
import { setDiscoverState } from '../../state/actions';
import { initialState } from '../../state/reducers';


@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    AdvancedSearchComponent,
    DatetimeNavigatorComponent,
    DiscoverHeaderComponent,
    TopicHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnDestroy, OnInit {
  public archiveData!: ArchiveTopics;

  public mainTopics?: Topic[];
  public activeMainTopicId!: string;

  public activeTopic?: Topic;
  public topicsBreadcrumb: BreadcrumbItem[] = [];

  public filters: FilterOption[] = [];

  public minYear = 0;
  public currentYear = new Date().getFullYear();

  private archiveService = inject(ArchiveService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private translate = inject(TranslateService);

  private topicId = signal('');
  private topicNames = computed(() => this.topicId()?.split('-'));

  private archiveId!: string;

  private unsubscribe$ = new Subject<void>();

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
    const getArchive$ = this.archiveService.getArchive(this.archiveId);

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
      takeUntil(this.unsubscribe$)
    ).subscribe(archiveData => {
      this.setArchiveData(archiveData);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public setActiveTopic(id: string): void {
    this.router.navigate(['topic', id], { relativeTo: this.route });
    this.activeMainTopicId = id;
    this.activeTopic = this.topicNames()?.length > 1
      ? this.archiveData.topics.find(topic => topic.id === id)
      : undefined;
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
    this.archiveId = '23flag01';
    this.topicId.set(url[RouteDiscover.Topic]);
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
    this.cdr.detectChanges();
  }

  private setMinYear(topics: Topic[]): void {
    const ranges = topics.filter(topic => topic.ranges).flatMap(topic => topic.ranges);
    this.minYear = Math.min(...ranges.map(range => range?.start || this.currentYear));
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
      takeUntil(this.unsubscribe$)
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
}
