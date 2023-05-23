import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private archiveService: ArchiveService, private router: Router) {}

  public ngOnInit(): void {
    const id = this.router.url.split('/')[2];
    this.archiveService.getArchive(id).subscribe(archiveData => {
      this.archiveData = archiveData;
      this.mainTopicName = this.archiveData.topics.find(topic => topic.id === '0')?.name;
      this.mainTopics = this.archiveData.topics.filter(topic => topic.id.length === 3 && topic.id.slice(0, 2) === '0-');
    });
  }

  public setActiveTopic(id: string): void {
    this.router.navigate(['topic', id]);
  }
}
