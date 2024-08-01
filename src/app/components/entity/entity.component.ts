import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Entity } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { ImageComponent } from '../image';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [ImageComponent, NgClass, TranslateModule, TranslationKeyPipe],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent {
  public entity = input.required<Entity>();
  public card = input(true);
  public showLabel = input(true);

  public setParentLabel(parent: string): string {
    return parent.split('-').slice(-1)[0];
  }
}
