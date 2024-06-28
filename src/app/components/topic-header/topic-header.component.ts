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
import { Subject, switchMap, takeUntil } from 'rxjs';

import { TopicWithRange } from '../../models';
import { ImagePipe } from '../../pipes';
import { TopicService, UserService } from '../../services';
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

  public isFavorite = signal(false);
  private selectedYear = signal<number | undefined>(undefined);
  
  public rangedTopic = computed(() => (
    this.topicService.setImageRange(this.topic(), this.selectedYear()))
  );
  
  public archiveId = '23flag01';

  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private topicService = inject(TopicService);
  private store = inject(Store);
  private userService = inject(UserService);
  
  private unsubscribe$ = new Subject<void>();
  private selectSelectedYear$ = this.store.select(selectSelectedYear);

  public ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.isFavorite.set(user?.favorites.includes(this.topic().id));
    });

    this.selectSelectedYear$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(selectedYear => {
      this.selectedYear.set(selectedYear);
      this.cdr.detectChanges();
    });
  }

  public addFavorite(): void {
    // TODO - Improve handling the updated favorites list
    this.userService.addFavorite(this.topic().id).pipe(
      switchMap(() => this.userService.getUser()),
    ).subscribe(user => {
      this.isFavorite.set(user?.favorites.includes(this.topic().id));
    });
  }

  public removeFavorite(): void {
    // TODO - Improve handling the updated favorites list
    this.userService.removeFavorite(this.topic().id).pipe(
      switchMap(() => this.userService.getUser()),
    ).subscribe(user => {
      this.isFavorite.set(user?.favorites.includes(this.topic().id));
    });
  }

  public goToPage(item: BreadcrumbItem): void {
    const route = item.link?.split('/');
    this.router.navigate(route || []);
  }

  // TODO - Consider moving this to a pipe
  public setTranslationKey(prefix: string, key?: string): string {
    if (!key) {
      return '\u2014';
    }

    return `${prefix}.${key.replace(/ /g, '_')}`;
  }
}
