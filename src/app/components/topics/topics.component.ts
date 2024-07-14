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
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, switchMap, take } from 'rxjs';

import {
  ArchiveTopics,
  Layout,
  Range,
  RouteDiscover,
  Topic,
  TopicWithRange
} from '../../models';
import { ImagePipe } from '../../pipes';
import { ArchiveService, TopicService } from '../../services';
import { SHARED_IMPORTS } from '../../shared';
import { selectDiscover, selectLayout, selectSelectedYear } from '../../state/selectors';
import { FilterOption, SortDirection, SortOption } from '../advanced-search';
import { ImageComponent } from '../image';
import { TopicComponent } from '../topic';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    ImageComponent,
    ImagePipe,
    RouterModule,
    TopicComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  private readonly archiveService = inject(ArchiveService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly topicService = inject(TopicService);

  public parentTopicId = signal('');

  private topics = signal<TopicWithRange[]>([]);

  private grandparentTopicId = computed(
    () => this.parentTopicId()?.split('-').slice(-1)[0] || ''
  );

  // TODO - Implement applyFilters method
  public filteredTopics: TopicWithRange[] = [];

  public gridLayout = true;

  public noImageFound = false;

  private activeFilters: FilterOption[] = [];
  private activeSorting?: SortOption;
  private selectedYear!: number;

  private selectDiscover$ = this.store.select(selectDiscover);
  private selectLayout$ = this.store.select(selectLayout);
  private selectSelectedYear$ = this.store.select(selectSelectedYear);

  public ngOnInit(): void {
    this.setParentTopicId(this.router.url);
    const getArchive$ = this.archiveService.getArchive();

    getArchive$.pipe(
      take(1)
    ).subscribe(archiveData => {
      this.setTopics(archiveData);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      switchMap(url => {
        this.setParentTopicId(url);
        return getArchive$;
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(archiveData => {
      this.setTopics(archiveData);
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
      this.filteredTopics = this.filterTopics(this.topics()).map(topic =>
        this.topicService.setImageRange(topic, this.selectedYear)
      );
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

  private filterTopics(topics: TopicWithRange[]): TopicWithRange[] {
    return topics.filter(({ altId, id, ranges}) => {
      const isChildTopic = this.isChildTopic(id) || this.isChildTopic(altId);

      if (!ranges || !ranges[0].start) {
        return isChildTopic;
      }

      return isChildTopic && this.selectedYearIsInRange(ranges);
    });
  }

  private isChildTopic(id?: string): boolean {
    if (!id) {
      return false;
    }
    
    // Define children of parent topic
    const isChild = id.startsWith(this.parentTopicId());
    const isGrandchild = this.isGrandchildTopic(id);
    const isSibling = this.isSiblingTopic(id);

    return isChild && !isGrandchild && !isSibling;
  }

  private isGrandchildTopic(id: string): boolean {
    const fullParentId = this.parentTopicId().length + this.grandparentTopicId().length;
    return id.length > fullParentId + 3 && id[fullParentId + 2] !== '_';
  }

  private isSiblingTopic(id: string): boolean {
    // If the first character after the topic id is an underscore, it is a sibling
    return id[this.parentTopicId().length] === '_' || id.length <= this.parentTopicId().length;
  }

  private selectedYearIsInRange(ranges: Range[]): boolean {
    return !!ranges.find(({ start, end }) =>
      start && start <= this.selectedYear && (!end || end > this.selectedYear)
    );
  }

  private setParentTopicId(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.parentTopicId.set(url[RouteDiscover.Topic]);
  }

  private setTopics(archiveData: ArchiveTopics): void {
    this.topics.set(archiveData.topics);
    this.filteredTopics = this.filterTopics(this.topics());
    this.cdr.detectChanges();
  }
}
