import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '../../shared';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
