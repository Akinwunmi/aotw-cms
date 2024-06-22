import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SHARED_IMPORTS } from '../../shared';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: SHARED_IMPORTS,
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
