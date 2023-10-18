import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  signal
} from '@angular/core';
import {
  AotwChipComponent,
  AotwDropdownDirective,
  AotwIconComponent,
  AotwYearPickerComponent,
  RangePipe
} from '@aotw/lib-ng';
import { Store } from '@ngrx/store';

import { SharedModule } from '../../shared';
import { setDiscoverState } from '../../state/actions';
import { initialState } from '../../state/reducers';

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
export class DatetimeNavigatorComponent implements OnInit {
  @Input()
  public min = 0;

  private currentYear = signal<number>(new Date().getFullYear());
  @Input()
  public max = this.currentYear();

  private store = inject(Store);

  private _selectedYear!: number;
  public get selectedYear(): number {
    return this._selectedYear;
  }
  public set selectedYear(selectedYear: number) {
    this._selectedYear = selectedYear;
    this.store.dispatch(setDiscoverState({
      ...initialState.discover,
      selectedYear: this.selectedYear
    }));
  }

  public dropdownIsOpen = false;

  public ngOnInit(): void {
    this.selectedYear = this.currentYear();
  }

  public previous(): void {
    this.selectedYear = this.selectedYear - 1;
  }

  public next(): void {
    this.selectedYear = this.selectedYear + 1;
  }

  public closeDropdown(): void {
    this.dropdownIsOpen = false;
  }

  public setDropdownState(): void {
    this.dropdownIsOpen = true;
  }
}
