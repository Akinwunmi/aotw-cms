import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Topic, ArchiveTopics } from '../../models';
import { ArchiveService } from '../../services';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public archiveData!: ArchiveTopics;

  public mainTopicName?: string;
  public mainTopics?: Topic[];
  public activeMainTopicId!: string;

  constructor(
    private archiveService: ArchiveService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const archiveId = this.router.url.split('/')[2];
    const mainTopicId = this.router.url.split('/')[5];

    this.archiveService.getArchive(archiveId).subscribe(archiveData => {
      this.archiveData = archiveData;
      this.mainTopicName = this.archiveData.topics.find(topic => topic.id === '0')?.name;
      this.mainTopics = this.archiveData.topics.filter(topic => topic.id.length === 4 && topic.id.slice(0, 2) === '0-');
      this.setActiveTopic(mainTopicId || this.mainTopics[0].id);
    });
  }

  public setActiveTopic(id: string): void {
    this.router.navigate(['topic', id], { relativeTo: this.route });
    this.activeMainTopicId = id;
  }
}
