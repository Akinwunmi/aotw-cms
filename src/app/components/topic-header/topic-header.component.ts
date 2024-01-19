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
  selector: 'app-topic-header',
  standalone: true,
  imports: [ SharedModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topic-header.component.html',
  styleUrl: './topic-header.component.scss'
})
export class TopicHeaderComponent implements OnInit {
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
