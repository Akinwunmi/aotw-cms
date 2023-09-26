import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal
} from '@angular/core';

import { DropdownDirective } from '../../directives';
import { RangePipe } from '../../pipes';
import { SharedModule } from '../../shared';
import { AotwChipComponent, AotwIconComponent, AotwYearPickerComponent } from '../lib';

@Component({
  selector: 'app-datetime-navigator',
  standalone: true,
  imports: [
    SharedModule,
    AotwChipComponent,
    AotwIconComponent,
    AotwYearPickerComponent,
    DropdownDirective,
    RangePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datetime-navigator.component.html',
  styleUrls: ['./datetime-navigator.component.scss']
})
export class DatetimeNavigatorComponent implements OnInit {
  public selectedYear!: number;
  public currentYear = signal<number>(new Date().getFullYear());
  public yearRange: [number, number] = [1900, this.currentYear()];

  public ngOnInit(): void {
    this.selectedYear = this.currentYear();
  }

  public previous(): void {
    this.selectedYear = this.selectedYear - 1;
  }

  public next(): void {
    this.selectedYear = this.selectedYear + 1;
  }

  public setYear(year: number): void {
    this.selectedYear = year;
  }
}
