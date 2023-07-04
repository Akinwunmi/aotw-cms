import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, Subject, switchMap, take, takeUntil } from 'rxjs';

import { ArchiveTopics, RouteDiscover, Topic } from '../../models';
import { ArchiveService } from '../../services';
import { BreadcrumbItem } from '../breadcrumb';
import { DiscoverHeaderComponent } from './discover-header';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, RouterModule, DiscoverHeaderComponent],
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

  private topicId = signal('');
  private topicNames = computed(() => this.topicId()?.split('-'));

  private archiveId!: string;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private archiveService: ArchiveService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getArchiveData(this.router.url);
    const getArchive$ = this.archiveService.getArchive(this.archiveId);

    getArchive$.pipe(
      take(1)
    ).subscribe(archiveData => {
      this.setArchiveData(archiveData);
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

  private getArchiveData(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
    this.topicId.set(url[RouteDiscover.Topic]);
    if (this.topicNames) {
      // set topic id as title and current url until index of parent topic + topic as link
      this.topicsBreadcrumb = this.topicNames()?.slice(0, -1).map(topic => ({
        title: topic,
        link: `${rawUrl.slice(0, rawUrl.indexOf(topic))}${topic}`
      } as BreadcrumbItem));
    }
  }

  private setArchiveData(archiveData: ArchiveTopics): void {
    this.archiveData = archiveData;
    this.mainTopicType = this.archiveData.topics.find(topic => topic.id.length === 2)?.type;
    this.mainTopics = this.archiveData.topics.filter(topic => topic.id.length === 2);
    this.setActiveTopic(this.topicId() || this.mainTopics[0].id);
}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
