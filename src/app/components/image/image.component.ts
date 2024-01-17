import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { SharedModule } from '../../shared';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input({ required: true })
  public src?: string;

  @Input({ required: true })
  public alt!: string;

  @HostBinding('class.placeholder')
  @Input()
  public placeholder = false;

  public handleImageError(): void {
    this.placeholder = true;
  }

  public handleImageLoad(): void {
    this.placeholder = false;
  }
}
