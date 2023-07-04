import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aotw-lib-chip',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './chip.component.html'
})
export class AotwChipComponent {
  @Input()
  public active = false;

  @Input()
  public disabled = false;

  @Input()
  public size?: 'small' | 'medium';
}
