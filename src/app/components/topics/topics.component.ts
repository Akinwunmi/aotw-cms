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

import { ArchiveTopics, Layout, RouteDiscover, Topic } from '../../models';
import { ArchiveService } from '../../services';
import { SharedModule } from '../../shared';
import { selectDiscover, selectLayout } from '../../state/selectors';
import { FilterOption, SortDirection, SortOption } from '../filters-and-sorting';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [SharedModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnDestroy, OnInit {
  public topics?: Topic[];

  @HostBinding('class.grid')
  public gridLayout = true;

  private archiveService = inject(ArchiveService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private store = inject(Store);

  private topicId = signal('');
  private parentTopic = computed(
    () => this.topicId()?.split('-').slice(-1)[0] || ''
  );

  private archiveId!: string;

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
    ).subscribe(([discover, layout]) => {
      this.activeFilters = discover.filters;
      this.activeSorting = discover.sorting.find(option => option.active);
      this.gridLayout = layout === Layout.Grid;

      // * WIP - Add sorting for the label that matches the topic key
      if (this.activeSorting?.label === 'Name') {
        this.topics?.reverse();
      }
      this.cdr.detectChanges();
    });
  }

  public getImage(id: string): string {
    const parsedId = id.replaceAll('-', '/');
    return `assets/mock/images/${this.archiveId}/${parsedId}.svg`;
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
    this.topics = archiveData.topics.filter(topic =>
      // Define childs of parent topic
      topic.id.startsWith(this.topicId()) &&
      // Only take direct children by validating length opposed to parent
      topic.id.length > this.topicId().length &&
      topic.id.length <= this.topicId().length + this.parentTopic().length + 3
    );
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
