import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FlagFormFieldComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import {
  AdvancedSearchComponent,
  FilterOption,
  SortDirection,
  SortOption
} from '../../components/advanced-search';
import { Entity } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { EntityService } from '../../services';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    AdvancedSearchComponent,
    FlagFormFieldComponent,
    TranslateModule,
    TranslationKeyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly entityService = inject(EntityService);
  private readonly cdr = inject(ChangeDetectorRef);

  public filteredEntities = computed(() => {
    return this.sortEntities();
  });

  public filters: FilterOption[] = [];
  public sorting: SortOption[] = [];
  public sortDirection = SortDirection.Asc;

  private entities = signal<Entity[]>([]);

  public ngOnInit(): void {
    this.entityService.getEntities().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(entities => {
      this.entities.set(entities);
      this.cdr.detectChanges();
    });
  }

  private sortEntities(): Entity[] {
    return this.entities().sort((a, b) => {
      const start = this.sortDirection === SortDirection.Asc ? a : b;
      const end = this.sortDirection === SortDirection.Asc ? b : a;
      if (end.id < start.id) {
        return start.id.localeCompare(end.id);
      }
      if (end.id > start.id) {
        return end.id.localeCompare(start.id);
      }
      return 0;
    });
  }
}
