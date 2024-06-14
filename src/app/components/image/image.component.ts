import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

import { SHARED_IMPORTS } from '../../shared';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: SHARED_IMPORTS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  public src = input.required<string>();
  public alt = input.required<string>();

  public placeholder = input(false);

  private _placeholderClass = this.placeholder();
  @HostBinding('class.placeholder')
  private get placeholderClass(): boolean {
    return this._placeholderClass;
  }
  private set placeholderClass(placeholderClass: boolean) {
    this._placeholderClass = placeholderClass;
  }

  public handleImageError(): void {
    this.placeholderClass = true;
  }

  public handleImageLoad(): void {
    this.placeholderClass = false;
  }
}
