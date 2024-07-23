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
import { TranslateModule } from '@ngx-translate/core';

import { EntityWithRangeSuffix } from '../../models';
import { ImagePipe, TranslationKeyPipe } from '../../pipes';
import { AuthService, EntityService } from '../../services';
import { selectSelectedYear } from '../../state/selectors';
import { FavoriteButtonComponent } from '../favorite-button';
import { ImageComponent } from '../image';

@Component({
  selector: 'app-entity-header',
  standalone: true,
  imports: [
    FavoriteButtonComponent,
    FlagBreadcrumbComponent,
    FlagButtonDirective,
    FlagIconComponent,
    ImageComponent,
    ImagePipe,
    RouterModule,
    TranslateModule,
    TranslationKeyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entity-header.component.html',
  styleUrls: ['./entity-header.component.scss'],
})
export class EntityHeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private entityService = inject(EntityService);
  private router = inject(Router);
  private store = inject(Store);

  public entity = input.required<EntityWithRangeSuffix>();

  public breadcrumb = input<BreadcrumbItem[]>([]);
  private selectedYear = signal<number | undefined>(undefined);

  public isLoggedIn = computed(() => !!this.authService.currentUser());
  
  public rangedEntity = computed(() => (
    this.entityService.setImageRange(this.entity(), this.selectedYear()))
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
