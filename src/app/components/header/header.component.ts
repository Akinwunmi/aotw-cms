import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@aotw/components';
import { Router } from '@angular/router';

import {
  AotwDropdownComponent,
  AotwDynamicTextComponent,
  AotwIconComponent,
  AotwListItemComponent
} from '../lib';
import { SidePanelService } from '../side-panel';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    AotwDropdownComponent,
    AotwDynamicTextComponent,
    AotwIconComponent,
    AotwListItemComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('class.create')
  @Input()
  public createMode = false;

  constructor(private router: Router, private sidePanelService: SidePanelService) {}

  public goToHome(): void {
    this.router.navigate(['']);
  }

  public openSidePanel(): void {
    this.sidePanelService.open();
  }
}
