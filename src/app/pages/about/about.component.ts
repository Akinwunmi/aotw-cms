import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PageHeaderComponent } from '../../components/page-header';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, TranslateModule],
  selector: 'app-about',
  standalone: true,
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
})
export class AboutComponent {}
