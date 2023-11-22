import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  AotwBreadcrumbComponent,
  AotwIconComponent,
  BreadcrumbItem
} from '@aotw/ng-components';

import { Topic } from '../../models';
import { ImagePipe } from '../../pipes';
import { SharedModule } from '../../shared';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    AotwBreadcrumbComponent,
    AotwIconComponent,
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

  private router = inject(Router);

  public archiveId!: string;

  public ngOnInit(): void {
    this.archiveId = '23flag01';
  }

  public goToPage(item: BreadcrumbItem): void {
    const route = item.link?.split('/');
    this.router.navigate(route || []);
  }
}
