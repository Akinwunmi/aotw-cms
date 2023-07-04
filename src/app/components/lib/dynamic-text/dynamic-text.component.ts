import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aotw-lib-dynamic-text',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.scss']
})
export class AotwDynamicTextComponent {
  @Input()
  public alignment?: 'left' | 'right';
}
