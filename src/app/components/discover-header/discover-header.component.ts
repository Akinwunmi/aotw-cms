import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AotwIconComponent } from '@aotw/lib-ng';

import { Topic } from '../../models';
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

  public ngOnInit(): void {
    this.archiveId = '23flag01';
  }
}
