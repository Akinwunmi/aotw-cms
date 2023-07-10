import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subject, filter, map, takeUntil } from 'rxjs';

import { RouteDiscover, Topic } from '../../models';
import { ArchiveService } from '../../services';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnDestroy, OnInit {
  public topics?: Topic[];

  private archiveService = inject(ArchiveService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  private archiveId!: string;

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.getTopics(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      takeUntil(this.unsubscribe$)
    ).subscribe(url => {
      this.getTopics(url);
    });
  }

  public getImage(id: string): string {
    const parsedId = id.replaceAll('-', '/');
    return `assets/mock/images/${this.archiveId}/${parsedId}.svg`;
  }

  private getTopics(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
    const topicId = url[RouteDiscover.Topic];
    const parentTopic = topicId?.split('-').slice(-1)[0] || '';

    // ! Fix nested subscribe
    this.archiveService.getArchive(this.archiveId).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(archiveData => {
      this.topics = archiveData.topics.filter(topic =>
        // Define childs of parent topic
        topic.id.startsWith(topicId) &&
        // Only take direct children by validating length opposed to parent
        topic.id.length > topicId.length &&
        topic.id.length <= topicId.length + parentTopic.length + 3
      ).map(topic => {
        if (topic.parent) {
          // The alternative parent for a topic
          topic.parent = topic.parent.split('-').slice(-1)[0].toUpperCase();
        }
        return topic;
      });
      this.cdr.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
