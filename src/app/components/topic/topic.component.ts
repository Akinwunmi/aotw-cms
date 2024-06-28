import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TopicWithRange } from '../../models';
import { ImagePipe, TranslationKeyPipe } from '../../pipes';
import { ImageComponent } from '../image';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [ImageComponent, ImagePipe, NgClass, TranslateModule, TranslationKeyPipe],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicComponent {
  public topic = input.required<TopicWithRange>();
  public card = input(true);
  public showLabel = input(true);

  public setParentLabel(parent: string): string {
    return parent.split('-').slice(-1)[0];
  }
}
