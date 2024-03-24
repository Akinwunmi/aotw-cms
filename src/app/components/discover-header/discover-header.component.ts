import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';

import { Topic } from '../../models';
import { SHARED_IMPORTS } from '../../shared';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: SHARED_IMPORTS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover-header.component.html',
  styleUrl: './discover-header.component.scss'
})
export class DiscoverHeaderComponent {
  public activeTopicId = input<string>();
  public topics = input<Topic[]>();

  public activeTopic = output<string>();

  public mainTopicType = computed<string | undefined>(() => this.topics()?.[0].type);

  public setActiveTopic(id: string): void {
    this.activeTopic.emit(id);
  }
}
