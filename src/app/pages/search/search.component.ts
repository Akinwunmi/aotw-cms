import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { AotwFormFieldComponent } from '@aotw/ng-components';
import { Subject, takeUntil } from 'rxjs';

import {
  AdvancedSearchComponent,
  FilterOption,
  SortDirection,
  SortOption
} from '../../components/advanced-search';
import { Topic } from '../../models';
import { ArchiveService } from '../../services';
import { SHARED_IMPORTS } from '../../shared';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    AdvancedSearchComponent,
    AotwFormFieldComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public filteredTopics = computed(() => {
    return this.sortTopics();
  });

  public filters: FilterOption[] = [];
  public sorting: SortOption[] = [];
  public sortDirection = SortDirection.Asc;

  private archiveService = inject(ArchiveService);
  private cdr = inject(ChangeDetectorRef);

  private topics = signal<Topic[]>([]);

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.archiveService.getArchive().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(({ topics }) => {
      this.topics.set(topics);
      this.cdr.detectChanges();
    });
  }

  public setTopicLabel(id: string): string {
    return id.replaceAll('-', '_');
  }

  private sortTopics(): Topic[] {
    return this.topics().sort((a, b) => {
      const start = this.sortDirection === SortDirection.Asc ? a : b;
      const end = this.sortDirection === SortDirection.Asc ? b : a;
      if (end.name < start.name) {
        return 1;
      }
      if (end.name > start.name) {
        return -1;
      }
      return 0;
    });
  }
}
