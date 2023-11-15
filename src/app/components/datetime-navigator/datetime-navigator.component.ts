import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import {
  AotwChipComponent,
  AotwDropdownDirective,
  AotwIconComponent,
  AotwYearPickerComponent,
  RangePipe
} from '@aotw/ng-components';
import { Store } from '@ngrx/store';
import { Subject, map, takeUntil } from 'rxjs';

import { SharedModule } from '../../shared';
import { setSelectedYear } from '../../state/actions';
import { selectSelectedYear } from '../../state/selectors';

@Component({
  selector: 'app-datetime-navigator',
  standalone: true,
  imports: [
    SharedModule,
    AotwChipComponent,
    AotwDropdownDirective,
    AotwIconComponent,
    AotwYearPickerComponent,
    RangePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datetime-navigator.component.html',
  styleUrls: ['./datetime-navigator.component.scss']
})
export class DatetimeNavigatorComponent implements OnDestroy, OnInit {
  @Input()
  public min = 0;

  @Input()
  public max = new Date().getFullYear();

  private store = inject(Store);

  public selectedYear!: number;

  public dropdownIsOpen = false;

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.store.select(selectSelectedYear).pipe(
      map(selectedYear => selectedYear),
      takeUntil(this.unsubscribe$)
    ).subscribe(selectedYear => {
      this.selectedYear = selectedYear;
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
