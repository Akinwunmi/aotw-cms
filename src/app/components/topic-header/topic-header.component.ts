import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbItem, FlagBreadcrumbComponent } from '@flagarchive/angular';
import { Store } from '@ngrx/store';

import { TopicWithRange } from '../../models';
import { ImagePipe, TranslationKeyPipe } from '../../pipes';
import { TopicService, UserService } from '../../services';
import { SHARED_IMPORTS } from '../../shared';
import { selectSelectedYear } from '../../state/selectors';
import { FavoriteButtonComponent } from '../favorite-button';
import { ImageComponent } from '../image';

@Component({
  selector: 'app-topic-header',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    FavoriteButtonComponent,
    FlagBreadcrumbComponent,
    ImageComponent,
    ImagePipe,
    RouterModule,
    TranslationKeyPipe
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
  
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private topicService = inject(TopicService);
  private store = inject(Store);
  private userService = inject(UserService);
  
  private selectSelectedYear$ = this.store.select(selectSelectedYear);

  public ngOnInit(): void {
    this.userService.getUser().subscribe();

    this.selectSelectedYear$.pipe(
      takeUntilDestroyed(this.destroyRef)
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
