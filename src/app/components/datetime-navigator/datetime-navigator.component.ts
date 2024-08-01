import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FlagButtonDirective,
  FlagDropdownDirective,
  FlagIconComponent,
  FlagYearPickerComponent,
  RangePipe
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { interval, map, Subject, takeUntil } from 'rxjs';

import { setSelectedYear } from '../../state/actions';
import { selectSelectedYear } from '../../state/selectors';

@Component({
  selector: 'app-datetime-navigator',
  standalone: true,
  imports: [
    FlagButtonDirective,
    FlagDropdownDirective,
    FlagIconComponent,
    FlagYearPickerComponent,
    NgClass,
    RangePipe,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datetime-navigator.component.html',
  styleUrls: ['./datetime-navigator.component.scss']
})
export class DatetimeNavigatorComponent implements OnDestroy, OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);

  public min = input(0);
  public max = input(new Date().getFullYear());

  private isPlayingBackward = signal(false);
  private isPlayingForward = signal(false);

  public isPlaying = computed(() => this.isPlayingBackward() || this.isPlayingForward());

  public dropdownIsOpen = false;
  public selectedYear!: number;

  private stop$ = new Subject<void>();
  private playSpeed$ = interval(750).pipe(
    takeUntil(this.stop$),
  );

  public ngOnInit(): void {
    this.store.select(selectSelectedYear).pipe(
      map(selectedYear => selectedYear),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(selectedYear => {
      this.selectedYear = Math.min(this.max(), selectedYear);
      this.cdr.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  public previous(): void {
    this.setSelectedYear(this.selectedYear - 1);
    this.stop();
  }

  public next(): void {
    this.setSelectedYear(this.selectedYear + 1);
    this.stop();
  }

  public play(backward?: boolean): void {
    this.isPlayingBackward.set(!!backward);
    this.isPlayingForward.set(!backward);
    this.playSpeed$.subscribe(() => {
      const maxReached = this.isPlayingForward() && this.max() === this.selectedYear;
      const minReached = this.isPlayingBackward() && this.min() === this.selectedYear;
      if (maxReached || minReached) {
        this.stop();
      }
      this.setSelectedYear(
        this.isPlayingBackward() ? this.selectedYear - 1 : this.selectedYear + 1,
      );
    });
  }

  public stop(): void {
    this.stop$.next();
    this.isPlayingBackward.set(false);
    this.isPlayingForward.set(false);
  }

  public setDropdownState(): void {
    this.dropdownIsOpen = true;
    this.stop();
  }

  public setSelectedYear(selectedYear: number): void {
    this.store.dispatch(setSelectedYear({ selectedYear }));
    this.dropdownIsOpen = false;
  }
}
