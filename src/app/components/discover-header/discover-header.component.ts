import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AotwIconComponent } from '@aotw/ng-components';

import { RouteDiscover, Topic } from '../../models';
import { ImagePipe } from '../../pipes';
import { SharedModule } from '../../shared';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    AotwIconComponent,
    BreadcrumbComponent,
    ImagePipe
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

  public archiveId!: string;

  private router = inject(Router);

  public ngOnInit(): void {
    const url = this.router.url.slice(1).split('/');
    this.archiveId = url[RouteDiscover.Archive];
  }
}
