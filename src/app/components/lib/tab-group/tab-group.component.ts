import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tab } from '../../../models';

@Component({
  selector: 'aotw-lib-tab-group',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tab-group.component.html',
})
export class AotwTabGroupComponent {
  @Input()
  public activeTab = 0;

  @Input()
  public tabs: Tab[] = [];

  @Output()
  public selectedTab = new EventEmitter<Tab>();

  public setActiveTab(activeTab: Tab): void {
    this.activeTab = activeTab.id;
    this.selectedTab.emit(activeTab);
  }
}
