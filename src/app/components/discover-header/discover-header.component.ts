import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { Topic } from '../../models';
import { SharedModule } from '../../shared';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [ SharedModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover-header.component.html',
  styleUrl: './discover-header.component.scss'
})
export class DiscoverHeaderComponent implements OnInit {
  @Input()
  public activeTopicId?: string;

  @Input()
  public topics?: Topic[];

  @Output()
  public activeTopic = new EventEmitter<string>();

  public mainTopicType?: string;

  public ngOnInit(): void {
    if (!this.topics) {
      return;
    }

    this.mainTopicType = this.topics[0].type;
  }

  public setActiveTopic(id: string): void {
    this.activeTopic.emit(id);
  }
}
