import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { AotwIconComponent } from '../lib';
import { SidePanelService } from './side-panel.service';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, AotwIconComponent],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnDestroy, OnInit {
  @HostBinding('class.show')
  public show = true;

  private unsubscribe$ = new Subject<void>();

  constructor(private sidePanelService: SidePanelService) {}

  public ngOnInit(): void {
    this.sidePanelService.getState().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(show => {
      this.show = show;
    });
  }

  public close(): void {
    this.sidePanelService.close();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
