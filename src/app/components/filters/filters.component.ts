import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { Chip, Layout } from '../../models';
import { SharedModule } from '../../shared';
import { setLayout } from '../../state/actions';
import { selectActiveLayout } from '../../state/selectors';
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
  public filterChips: Chip[] = [
    { label: '', icon: Layout.List, active: false, disabled: false },
    { label: '', icon: Layout.Grid, active: true, disabled: false },
  ];

  public showSearch = false;

  private cdr = inject(ChangeDetectorRef);
  private store = inject(Store);

  private unsubscribe$ = new Subject<void>();
  public selectLayout$ = this.store.select(selectActiveLayout);

  public ngOnInit(): void {
    // this.selectLayout$.pipe(
    //   takeUntil(this.unsubscribe$)
    // ).subscribe(layout => {
    //   console.log(layout);
    //   this.filterChips = this.filterChips.map(chip => ({
    //     ...chip,
    //     active: chip.icon === layout
    //   }));
    //   this.cdr.detectChanges();
    // });
  }

  public setLayout(chip: Chip): void {
    console.log(chip.icon);
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
