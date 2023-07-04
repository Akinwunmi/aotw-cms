import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { RouteDiscover, Topic } from '../../../models';
import { BreadcrumbComponent, BreadcrumbItem } from '../../breadcrumb';
import { AotwIconComponent } from '../../lib';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AotwIconComponent, BreadcrumbComponent],
  templateUrl: './discover-header.component.html',
  styleUrls: ['./discover-header.component.scss']
})
export class DiscoverHeaderComponent implements OnInit {
  @Input()
  public breadcrumb: BreadcrumbItem[] = [];

  @Input()
  public topic!: Topic;

  private archiveId!: string;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    const url = this.router.url.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
  }

  public getImage(id?: string): string {
    if (!id) {
      return '';
    }
    return `assets/mock/images/${this.archiveId}/${id.replaceAll('-', '/')}.svg`;
  }
}
