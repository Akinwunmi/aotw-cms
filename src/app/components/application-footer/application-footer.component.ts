import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { APP_ROUTES } from '../../app.routes';
import { UserRole } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { AuthService, UserService } from '../../services';

import { SitemapItem } from './application-footer.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, TranslateModule, TranslationKeyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './application-footer.component.html',
  styleUrls: ['./application-footer.component.scss'],
})
export class ApplicationFooterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  public currentUser = this.authService.currentUser;

  public currentYear = new Date().getFullYear();
  public sitemap!: SitemapItem[];

  public showAdminLink = computed(() => this.userService.roles().includes(UserRole.Admin));

  public ngOnInit(): void {
    this.sitemap = APP_ROUTES
      .filter((route) => route.path !== '**')
      // TEMP Until it is fixed how to filter out pages that are not needed when logged in
      .filter((route) => (
        route.path !== 'admin' &&
        route.path !== 'login' &&
        route.path !== 'my-account' &&
        route.path !== 'my-favorites' &&
        route.path !== 'signup'
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
