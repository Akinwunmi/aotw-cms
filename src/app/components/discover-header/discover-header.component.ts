import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AotwIconComponent } from '@aotw/lib-ng';

import { RouteDiscover, Topic } from '../../models';
import { SharedModule } from '../../shared';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    AotwIconComponent,
    BreadcrumbComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover-header.component.html',
  styleUrls: ['./discover-header.component.scss'],
})
export class DiscoverHeaderComponent implements OnInit {
  @Input()
  public breadcrumb: BreadcrumbItem[] = [];

  @Input()
  public topic!: Topic;

  private router = inject(Router);

  private archiveId!: string;

  public ngOnInit(): void {
    const url = this.router.url.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
  }

  public getImage(id?: string): string {
    if (!id) {
      return '';
    }

    const parsedId = id.replaceAll('-', '/');
    return `assets/mock/images/${this.archiveId}/${parsedId}.svg`;
  }
}
