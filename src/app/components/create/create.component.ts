import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '../../shared';
import { AotwFieldComponent, AotwLabelComponent } from '../lib';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModule, AotwFieldComponent, AotwLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {}
