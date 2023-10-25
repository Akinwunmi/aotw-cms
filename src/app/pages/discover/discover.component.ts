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
import { TranslateService } from '@ngx-translate/core';
import { filter, map, Subject, switchMap, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { BreadcrumbItem } from '../../components/breadcrumb';
import { DatetimeNavigatorComponent } from '../../components/datetime-navigator';
import { DiscoverHeaderComponent } from '../../components/discover-header';
import {
  FilterOption,
  AdvancedSearchComponent,
  SortDirection,
  SortOption
} from '../../components/advanced-search';
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
    DiscoverHeaderComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnDestroy, OnInit {
  public archiveData!: ArchiveTopics;

  public mainTopicType?: string;
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

  public setActiveTopic(id: string): void {
    this.router.navigate(['topic', id], { relativeTo: this.route });
    this.activeMainTopicId = id;
    this.activeTopic = this.topicNames()?.length > 1
      ? this.archiveData.topics.find(topic => topic.id === id)
      : undefined;
  }

  public setState(): void {
    // structuredClone instead of a spread operator is needed to create a deep copy
    this.store.dispatch(setDiscoverState({
      ...initialState.discover,
      filters: this.filters,
      sorting: structuredClone(this.sorting),
      sortDirection: this.sortDirection
    }));
  }

  private getArchiveData(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
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

    this.filters = [
      {
        // TODO: Fix string not updating on language change
        label: this.translate.instant('DISCOVER.HAS_PARENT', {
          type: parentType?.toLowerCase()
        }),
        active: false,
        disabled: false
      }
    ];
    this.sorting = [
      {
        label: `${this.translate.instant('COMMON.NAME')}`,
        firstValue: 'A',
        secondValue: 'Z',
        active: true,
        disabled: false
      },
      {
        label: `${this.translate.instant('DISCOVER.PARENT')}`,
        firstValue: 'A',
        secondValue: 'Z',
        active: false,
        disabled: false
      }
    ];

    this.mainTopicType = topics.find(topic => topic.id.length === 2)?.type;
    this.mainTopics = topics.filter(topic => topic.id.length === 2);
    this.setActiveTopic(this.topicId() || this.mainTopics[0].id);
    this.cdr.detectChanges();
  }

  private setMinYear(topics: Topic[]): void {
    const ranges = topics.filter(topic => topic.ranges).flatMap(topic => topic.ranges);
    this.minYear = Math.min(...ranges.map(range => range?.start || this.currentYear));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}