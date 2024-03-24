import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal
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
import { SHARED_IMPORTS } from '../../shared';
import { selectSelectedYear } from '../../state/selectors';
import { ImageComponent } from '../image';

@Component({
  selector: 'app-topic-header',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    RouterModule,
    AotwBreadcrumbComponent,
    AotwIconComponent,
    ImageComponent,
    ImagePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topic-header.component.html',
  styleUrls: ['./topic-header.component.scss'],
})
export class TopicHeaderComponent implements OnInit {
  public topic = input.required<TopicWithRange>();

  public breadcrumb = input<BreadcrumbItem[]>([]);

  private selectedYear = signal<number | undefined>(undefined);
  
  public rangedTopic = computed(() => (
    this.topicService.setImageRange(this.topic(), this.selectedYear()))
  );
  
  public archiveId = '23flag01';

  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private topicService = inject(TopicService);
  private store = inject(Store);
  
  private unsubscribe$ = new Subject<void>();
  private selectSelectedYear$ = this.store.select(selectSelectedYear);

  public ngOnInit(): void {
    this.selectSelectedYear$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(selectedYear => {
      this.selectedYear.set(selectedYear);
      this.cdr.detectChanges();
    });
  }

  public goToPage(item: BreadcrumbItem): void {
    const route = item.link?.split('/');
    this.router.navigate(route || []);
  }
}
