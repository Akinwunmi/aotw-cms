import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from '../../app-routing.module';

import { SitemapItem } from './footer.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public currentYear = new Date().getFullYear();
  public sitemap!: SitemapItem[];

  public ngOnInit(): void {
    this.sitemap = routes
      .filter(route => route.path?.length && route.path !== 'archive')
      .map(({ path, title }) => ({
        path: path || '',
        title: title as string
      }));
  }
}
