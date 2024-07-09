import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ARCHIVE_ROUTES } from '../../pages/archive';
import { SHARED_IMPORTS } from '../../shared';

import { SitemapItem } from './application-footer.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [...SHARED_IMPORTS, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './application-footer.component.html',
  styleUrls: ['./application-footer.component.scss'],
})
export class ApplicationFooterComponent implements OnInit {
  public currentYear = new Date().getFullYear();
  public sitemap!: SitemapItem[];

  public ngOnInit(): void {
    this.sitemap = ARCHIVE_ROUTES
      .filter((route) => route.path !== '**')
      .map(({ path, title }) => ({
        path: path || '',
        title: title as string,
      }));
  }
}
