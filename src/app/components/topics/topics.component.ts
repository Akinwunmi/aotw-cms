import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { Topic } from '../../models';
import { ArchiveService } from '../../services';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  public topics?: Topic[];

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

  private getTopics(url: string): void {
    const archiveId = url.split('/')[2];
    const topicIdentifier = 'topic/';
    const parentTopicId = url.slice(url.indexOf(topicIdentifier) + topicIdentifier.length);
    const lastParentTopicChild = parentTopicId.split('-').slice(-1)[0];
    this.archiveService.getArchive(archiveId).subscribe(archiveData => {
      this.topics = archiveData.topics.filter(topic =>
        topic.id.startsWith(parentTopicId) &&
        (topic.id.length === parentTopicId.length + lastParentTopicChild.length + 2 ||
        topic.id.length === parentTopicId.length + lastParentTopicChild.length + 3)
      ).map(topic => {
        if (topic.parent) {
          topic.parent = topic.parent.split('-').slice(-1)[0].toUpperCase();
        }
        return topic;
      });
    });
  }
}
