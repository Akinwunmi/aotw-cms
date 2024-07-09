import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  input
} from '@angular/core';
import {
  AotwYearPickerComponent,
  ButtonDirective,
  FlagDropdownDirective,
  FlagIconComponent,
  RangePipe
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { Subject, map, takeUntil } from 'rxjs';

import { SHARED_IMPORTS } from '../../shared';
import { setSelectedYear } from '../../state/actions';
import { selectSelectedYear } from '../../state/selectors';

@Component({
  selector: 'app-datetime-navigator',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    AotwYearPickerComponent,
    ButtonDirective,
    FlagDropdownDirective,
    FlagIconComponent,
    RangePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datetime-navigator.component.html',
  styleUrls: ['./datetime-navigator.component.scss']
})
export class DatetimeNavigatorComponent implements OnDestroy, OnInit {
  public min = input(0);
  public max = input(new Date().getFullYear());

  private store = inject(Store);

  public selectedYear!: number;

  public dropdownIsOpen = false;

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.store.select(selectSelectedYear).pipe(
      map(selectedYear => selectedYear),
      takeUntil(this.unsubscribe$)
    ).subscribe(selectedYear => {
      this.selectedYear = Math.min(this.max(), selectedYear);
    });
  }

  public previous(): void {
    this.setSelectedYear(this.selectedYear - 1);
  }

  public next(): void {
    this.setSelectedYear(this.selectedYear + 1);
  }

  public setDropdownState(): void {
    this.dropdownIsOpen = true;
  }

  public setSelectedYear(selectedYear: number): void {
    this.store.dispatch(setSelectedYear({ selectedYear }));
    this.dropdownIsOpen = false;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
