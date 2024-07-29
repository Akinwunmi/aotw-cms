import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PageHeaderComponent } from '../../components/page-header';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, TranslateModule],
  selector: 'app-admin',
  standalone: true,
  styleUrl: './admin.component.scss',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private readonly router = inject(Router);

  public goToAddEntity(): void {
    this.router.navigate(['admin', 'add-entity']);
  }
}
