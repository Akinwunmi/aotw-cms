import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '../../shared';
import {
  AotwFieldComponent,
  AotwLabelComponent,
  AotwStepperComponent
} from '../lib';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    SharedModule,
    AotwFieldComponent,
    AotwLabelComponent,
    AotwStepperComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  public completed = false;

  public steps = [
    'CREATE.STEPS.NAME',
    'CREATE.STEPS.MAIN_CATEGORY',
    'CREATE.STEPS.MAIN_TOPICS',
    'CREATE.STEPS.LAYOUT'
  ];
}
