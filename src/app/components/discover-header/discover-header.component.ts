import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { TopicWithRange } from '../../models';
import { ImagePipe } from '../../pipes';
import { TopicService } from '../../services';
import { SharedModule } from '../../shared';
import { selectSelectedYear } from '../../state/selectors';
import { ImageComponent } from '../image';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    AotwBreadcrumbComponent,
    AotwIconComponent,
    ImageComponent,
    ImagePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover-header.component.html',
  styleUrls: ['./discover-header.component.scss'],
})
export class DiscoverHeaderComponent implements OnInit {
  @Input()
  public breadcrumb: BreadcrumbItem[] = [];

  private _topic!: TopicWithRange;
  public get topic(): TopicWithRange {
    return this._topic;
  }
  @Input()
  public set topic(topic: TopicWithRange) {
    this._topic = topic;
    this.rangedTopic = this.topicService.setImageRange(topic);
  }

  public archiveId!: string;

  public rangedTopic = this.topic;

  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private topicService = inject(TopicService);
  private store = inject(Store);
  
  private unsubscribe$ = new Subject<void>();
  private selectSelectedYear$ = this.store.select(selectSelectedYear);

  public ngOnInit(): void {
    this.archiveId = '23flag01';

    this.selectSelectedYear$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(selectedYear => {
      this.rangedTopic = this.topicService.setImageRange(this.topic, selectedYear);
      this.cdr.detectChanges();
    });
  }

  public goToPage(item: BreadcrumbItem): void {
    const route = item.link?.split('/');
    this.router.navigate(route || []);
  }
}
