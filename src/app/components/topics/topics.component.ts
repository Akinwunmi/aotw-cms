import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';

import { Topic } from '../../models';
import { ArchiveService } from '../../services';
import { RouteDiscover } from 'src/app/models/routes.model';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  public topics?: Topic[];

  private archiveId!: string;

  constructor(private archiveService: ArchiveService, private router: Router) {}

  public ngOnInit(): void {
    this.getTopics(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url)
    ).subscribe(url => {
      this.getTopics(url);
    });
  }

  public getImage(id: string): string {
    return `assets/mock/images/${this.archiveId}/${id}.svg`;
  }

  private getTopics(rawUrl: string): void {
    const url = rawUrl.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
    const topicId = url[RouteDiscover.Topic];
    const parentTopic = topicId.split('-').slice(-1)[0];

    this.archiveService.getArchive(this.archiveId).subscribe(archiveData => {
      this.topics = archiveData.topics.filter(topic =>
        // Define childs of parent topic
        topic.id.startsWith(topicId) &&
        // Only take direct children by validating the length opposed to the parent
        topic.id.length > topicId.length &&
        topic.id.length <= topicId.length + parentTopic.length + 3
      ).map(topic => {
        if (topic.parent) {
          // The alternative parent for a topic
          topic.parent = topic.parent.split('-').slice(-1)[0].toUpperCase();
        }
        return topic;
      });
    });
  }
}
