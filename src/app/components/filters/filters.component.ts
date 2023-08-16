import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { Chip, Layout } from '../../models';
import { SharedModule } from '../../shared';
import { setLayout } from '../../state/actions';
import { selectLayout } from '../../state/selectors';
import {
  AotwChipGroupComponent,
  AotwFieldComponent,
  AotwIconComponent,
} from '../lib';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    SharedModule,
    AotwChipGroupComponent,
    AotwFieldComponent,
    AotwIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnDestroy, OnInit {
  @Output()
  public activeLayout = new EventEmitter<Layout>();

  public filterChips: Chip[] = [
    { label: '', icon: Layout.List, active: false, disabled: false },
    { label: '', icon: Layout.Grid, active: false, disabled: false },
  ];

  public showSearch = false;

  private store = inject(Store);

  private unsubscribe$ = new Subject<void>();
  private selectLayout$ = this.store.select(selectLayout);

  public ngOnInit(): void {
    this.selectLayout$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(layout => {
      const chip = this.filterChips.find(chip => chip.icon === layout);
      if (chip) {
        chip.active = true;
      }
      this.activeLayout.emit(layout);
    });
  }

  public setLayout(chip: Chip): void {
    this.store.dispatch(setLayout({ layout: chip.icon as Layout }));
  }

  public toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
