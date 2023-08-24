import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from '../../app.routes';
import { SharedModule } from '../../shared';

import { SitemapItem } from './footer.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public currentYear = new Date().getFullYear();
  public sitemap!: SitemapItem[];

  public ngOnInit(): void {
    this.sitemap = APP_ROUTES.slice(1, -1)
      .filter(route => route.path !== 'archive' && route.path !== 'login')
      .map(({ path, title }) => ({
        path: path || '',
        title: title as string,
      }));
  }
}
