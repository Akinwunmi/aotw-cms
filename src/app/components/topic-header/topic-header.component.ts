import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostBinding,
  HostListener,
  OnInit,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import {
  BreadcrumbItem,
  FlagBreadcrumbComponent,
  FlagButtonDirective,
  FlagIconComponent,
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';

import { TopicWithRange } from '../../models';
import { ImagePipe, TranslationKeyPipe } from '../../pipes';
import { AuthService, TopicService } from '../../services';
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
    FlagButtonDirective,
    FlagIconComponent,
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
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private topicService = inject(TopicService);
  private store = inject(Store);

  public topic = input.required<TopicWithRange>();

  public breadcrumb = input<BreadcrumbItem[]>([]);
  private selectedYear = signal<number | undefined>(undefined);

  public isLoggedIn = computed(() => !!this.authService.currentUser());
  
  public rangedTopic = computed(() => (
    this.topicService.setImageRange(this.topic(), this.selectedYear()))
  );

  @HostBinding('class.expanded')
  public isExpanded = true;

  public isMobile = window.innerWidth < 640;

  private selectSelectedYear$ = this.store.select(selectSelectedYear);
  
  @HostListener('window:resize')
  public onWindowResize(): void {
    this.isMobile = window.innerWidth < 640;
  }

  public ngOnInit(): void {
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

  public toggleState(): void {
    this.isExpanded = !this.isExpanded;
  }
}
