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
import { selectDiscover, selectLayout } from '../../state/selectors';
import { FilterOption, SortDirection, SortOption } from '../advanced-search';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [SharedModule, RouterModule, ImagePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnDestroy, OnInit {
  // TODO - Implement applyFilters method
  public filteredTopics = computed(() => this.topics());

  @HostBinding('class.grid')
  public gridLayout = true;

  public archiveId!: string;

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

  private unsubscribe$ = new Subject<void>();
  private selectDiscover$ = this.store.select(selectDiscover);
  private selectLayout$ = this.store.select(selectLayout);

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

    combineLatest([this.selectDiscover$, this.selectLayout$]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([{ filters, sorting, sortDirection, selectedYear }, layout]) => {
      this.activeFilters = filters;
      this.activeSorting = sorting.find(option => option.active);
      this.setRangeImage(selectedYear);
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

  private setRangeImage(selectedYear: number): void {
    this.topics.set(this.filteredTopics().map(topic => {
      topic.rangeImage = topic.image;

      if (!topic.ranges) {
        return topic;
      }

      if (topic.ranges.length === 1) {
        const { start, end } = topic.ranges.slice(-1)[0];
        return {
          ...topic,
          rangeSuffix: `_${start}-${end || ''}`
        };
      }

      const range = topic.ranges.reduce((prev, curr) => {
        if (curr.start && selectedYear - curr.start >= 0) {
          return curr;
        }
        if (prev.start && selectedYear - prev.start >= 0) {
          return prev;
        }
        return {};
      });

      const { start, end } = range;
      return {
        ...topic,
        rangeImage: !!start,
        rangeSuffix: start ? `_${start}-${end || ''}` : undefined
      };
    }));
  }

  public setParentLabel(parent: string): string {
    return parent.split('-').slice(-1)[0];
  }

  private getTopics(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
    this.topicId.set(url[RouteDiscover.Topic]);
  }

  private setTopics(archiveData: ArchiveTopics): void {
    this.topics.set(archiveData.topics.filter(topic =>
      // Define childs of parent topic
      topic.id.startsWith(this.topicId()) &&
      // Only take direct children by validating length opposed to parent
      topic.id.length > this.topicId().length &&
      topic.id.length <= this.topicId().length + this.parentTopic().length + 3
    ));
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
