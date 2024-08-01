import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
  selector: 'app-page-not-found',
  standalone: true,
  styleUrl: './page-not-found.component.scss',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {}
