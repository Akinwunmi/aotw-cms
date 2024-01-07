import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AotwSkeletonComponent } from '@aotw/ng-components';
import { Store } from '@ngrx/store';
import { Subject, combineLatest, filter, map, switchMap, take, takeUntil } from 'rxjs';

import {
  ArchiveTopics,
  Layout,
  RouteDiscover,
  Topic,
  TopicWithRange
} from '../../models';
import { ImagePipe } from '../../pipes';
import { ArchiveService } from '../../services';
import { SharedModule } from '../../shared';
import { selectDiscover, selectLayout, selectSelectedYear } from '../../state/selectors';
import { FilterOption, SortDirection, SortOption } from '../advanced-search';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [SharedModule, RouterModule, AotwSkeletonComponent, ImagePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnDestroy, OnInit {
  // TODO - Implement applyFilters method
  public filteredTopics: TopicWithRange[] = [];

  @HostBinding('class.grid')
  public gridLayout = true;

  public archiveId!: string;

  public noImageFound = false;

  private archiveService = inject(ArchiveService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private store = inject(Store);

  private topics = signal<TopicWithRange[]>([]);
  private topicId = signal('');
  private parentTopic = computed(
    () => this.topicId()?.split('-').slice(-1)[0] || ''
  );

  private activeFilters: FilterOption[] = [];
  private activeSorting?: SortOption;
  private selectedYear!: number;

  private unsubscribe$ = new Subject<void>();
  private selectDiscover$ = this.store.select(selectDiscover);
  private selectLayout$ = this.store.select(selectLayout);
  private selectSelectedYear$ = this.store.select(selectSelectedYear);

  public ngOnInit(): void {
    this.getTopics(this.router.url);
    const getArchive$ = this.archiveService.getArchive(this.archiveId);

    getArchive$.pipe(
      take(1)
    ).subscribe(archiveData => {
      this.setTopics(archiveData);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      switchMap(url => {
        this.getTopics(url);
        return getArchive$;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(archiveData => {
      this.setTopics(archiveData);
    });

    combineLatest([
      this.selectDiscover$,
      this.selectLayout$,
      this.selectSelectedYear$
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([{ filters, sorting, sortDirection }, layout, selectedYear]) => {
      this.activeFilters = filters;
      this.activeSorting = sorting.find(option => option.active);
      this.selectedYear = selectedYear;
      this.setImageRange();
      this.gridLayout = layout === Layout.Grid;

      // TODO - Fix parent sorting
      this.topics.update(topics => topics.sort((a, b) => {
        const key = this.activeSorting?.label.toLowerCase();
        const nameA = a[key as keyof Topic];
        const nameB = b[key as keyof Topic];
        
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

  public handleImageError(event: ErrorEvent): void {
    this.noImageFound = true;
    (event.target as HTMLImageElement).style.display = 'none';
  }

  public handleImageLoad(event: Event): void {
    this.noImageFound = false;
    (event.target as HTMLImageElement).style.display = 'block';
  }

  public setParentLabel(parent: string): string {
    return parent.split('-').slice(-1)[0];
  }

  private setImageRange(): void {
    this.filteredTopics = (this.filterTopics(this.topics()).map(topic => {
      if (!topic.ranges) {
        return topic;
      }

      if (topic.ranges.length === 1) {
        const { start, end, image } = topic.ranges.slice(-1)[0];
        return {
          ...topic,
          image: image ?? topic.image,
          rangeSuffix: `_${start}-${end || ''}`
        };
      }

      const range = topic.ranges.reduce((prev, curr) => {
        if (curr.start && this.selectedYear - curr.start >= 0) {
          return curr;
        }
        if (prev.start && this.selectedYear - prev.start >= 0) {
          return prev;
        }
        return {};
      });

      const { start, end, image } = range;
      return {
        ...topic,
        image: image ?? topic.image,
        rangeSuffix: start ? `_${start}-${end || ''}` : undefined
      };
    }));
  }

  private getTopics(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.archiveId = '23flag01';
    this.topicId.set(url[RouteDiscover.Topic]);
  }

  private setTopics(archiveData: ArchiveTopics): void {
    this.topics.set(archiveData.topics);
    this.filteredTopics = this.filterTopics(this.topics());
    this.cdr.detectChanges();
  }

  private filterTopics(topics: TopicWithRange[]): TopicWithRange[] {
    return topics.filter(topic => {
      const query =
        // Define childs of parent topic
        topic.id.startsWith(this.topicId()) &&
        // If the first character after the topic id is an underscore,
        // it is part of the parent screen and is filtered out
        topic.id[this.topicId().length] !== '_' &&
        topic.id.length > this.topicId().length &&
        (
          // Only take direct children by validating length opposed to parent
          topic.id.length <= this.topicId().length + this.parentTopic().length + 3 ||
          // Also check if the next character is an underscore so it is included
          topic.id[this.topicId().length + this.parentTopic().length + 2] === '_'
        );

      const { ranges } = topic;

      if (!ranges || !ranges[0].start) {
        return query;
      }

      // Check if selected year is within range
      return query &&
        ranges.find(({ start, end }) =>
          start && start <= this.selectedYear && (!end || end > this.selectedYear)
        );
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
