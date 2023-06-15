import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';

import { ArchiveTopics, RouteDiscover, Topic } from '../../models';
import { ArchiveService } from '../../services';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public archiveData!: ArchiveTopics;

  public mainTopicType?: string;
  public mainTopics?: Topic[];
  public activeMainTopicId!: string;

  public activeTopic?: Topic;
  public topicsBreadcrumb: BreadcrumbItem[] = [];

  private archiveId!: string;

  constructor(
    private archiveService: ArchiveService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getArchiveData(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url)
    ).subscribe(url => {
      this.getArchiveData(url);
    });
  }


  public getImage(id?: string): string {
    if (!id) {
      return '';
    }
    return `assets/mock/images/${this.archiveId}/${id.replaceAll('-', '/')}.svg`;
  }

  public setActiveTopic(id: string, topics?: string[]): void {
    this.router.navigate(['topic', id], { relativeTo: this.route });
    this.activeMainTopicId = id;
    this.activeTopic = topics && topics?.length > 1
      ? this.archiveData.topics.find(topic => topic.id === id)
      : undefined;
  }

  private getArchiveData(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
    const topicId = url[RouteDiscover.Topic];
    const topics = topicId?.split('-');
    if (topics) {
      // set topic id as title and current url until index of parent topic + topic as link
      this.topicsBreadcrumb = topics.slice(0, -1).map(topic => ({
        title: topic,
        link: `${rawUrl.slice(0, rawUrl.indexOf(topic))}${topic}`
      } as BreadcrumbItem));
    }

    this.archiveService.getArchive(this.archiveId).subscribe(archiveData => {
      this.archiveData = archiveData;
      this.mainTopicType = this.archiveData.topics.find(topic => topic.id.length === 2)?.type;
      this.mainTopics = this.archiveData.topics.filter(topic => topic.id.length === 2);
      this.setActiveTopic(topicId || this.mainTopics[0].id, topics);
    });
  }
}
