import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Tab } from '../../../models';
import { SharedModule } from '../../../shared';

@Component({
  selector: 'aotw-lib-tab-group',
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
