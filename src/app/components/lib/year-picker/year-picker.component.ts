import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { RangePipe } from '../../../pipes';
import { SharedModule } from '../../../shared';
import { AotwChipComponent } from '../chip';
import { AotwIconComponent } from '../icon';

@Component({
  selector: 'aotw-lib-year-picker',
  standalone: true,
  imports: [
    SharedModule,
    AotwChipComponent,
    AotwIconComponent,
    RangePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss']
})
export class AotwYearPickerComponent implements OnInit {
  @Input()
  public min = 0;

  @Input()
  public max = 0;

  @Input()
  public rangeSize = 9;

  @Input()
  public selected = 0;

  @Output()
  public selectedChange = new EventEmitter<number>();

  public activeRange!: [number, number];

  public ngOnInit(): void {
    this.activeRange = [this.max + 1 - this.rangeSize, this.max];
  }

  public previous(): void {
    const minValue = this.activeRange[0] - this.rangeSize;
    this.activeRange = minValue < this.min
      ? [this.min, this.min - 1 + this.rangeSize]
      : [minValue, this.activeRange[1] - this.rangeSize];
  }

  public next(): void {
    const maxValue = this.activeRange[1] + this.rangeSize;
    this.activeRange = maxValue > this.max
      ? [this.max + 1 - this.rangeSize, this.max]
      : [this.activeRange[0] + this.rangeSize, maxValue];
  }

  public setYear(year: number): void {
    this.selected = year;
    this.selectedChange.emit(this.selected);
  }
}
