import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared';
import { AotwFieldComponent } from '../lib';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, TranslateModule, AotwFieldComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  // ! WIP
}
