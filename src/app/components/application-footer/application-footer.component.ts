import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from '../../app.routes';
import { TranslationKeyPipe } from '../../pipes';
import { AuthService } from '../../services';
import { SHARED_IMPORTS } from '../../shared';

import { SitemapItem } from './application-footer.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [...SHARED_IMPORTS, RouterModule, TranslationKeyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './application-footer.component.html',
  styleUrls: ['./application-footer.component.scss'],
})
export class ApplicationFooterComponent implements OnInit {
  private readonly authService = inject(AuthService);

  public currentUser = this.authService.currentUser;

  public currentYear = new Date().getFullYear();
  public sitemap!: SitemapItem[];

  public ngOnInit(): void {
    this.sitemap = APP_ROUTES
      .filter((route) => route.path !== '**')
      // TEMP Until it is fixed how to filter out pages that are not needed when logged in
      .filter((route) => (
        route.path !== 'login' &&
        route.path !== 'signup' &&
        route.path !== 'my-account' &&
        route.path !== 'my-favorites'
      ))
      .map(({ path }) => {
        const title = path as string;
        return {
          path: path || '',
          title: title.length ? title : 'Home',
        };
      });
  }
}
