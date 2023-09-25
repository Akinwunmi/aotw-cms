import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AotwChipComponent, AotwIconComponent } from '../lib';

@Component({
  selector: 'app-datetime-navigator',
  standalone: true,
  imports: [
    CommonModule,
    AotwChipComponent,
    AotwIconComponent
  ],
  templateUrl: './datetime-navigator.component.html',
  styleUrls: ['./datetime-navigator.component.scss']
})
export class DatetimeNavigatorComponent implements OnInit {
  public selectedYear!: number;

  public currentYear = signal<number>(new Date().getFullYear());

  public ngOnInit(): void {
    this.selectedYear = this.currentYear();
  }

  public previous(): void {
    this.selectedYear = this.selectedYear - 1;
  }

  public next(): void {
    this.selectedYear = this.selectedYear + 1;
  }

  public openMenu(): void {
    //
  }
}
