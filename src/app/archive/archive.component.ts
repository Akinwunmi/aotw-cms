import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, Subject } from 'rxjs';

import { Tab } from './archive.model';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnDestroy, OnInit {
  public tabs: Tab[] = [
    { id: 0, name: 'search', label: 'Search', disabled: false },
    { id: 1, name: 'discover', label: 'Discover', disabled: false }
  ];
  public activeTab = 0;
  public currentPath = '';

  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.setActiveTab(this.router.url);
    this.currentPath = this.router.url.split('/').slice(0, -1).join('/') + '/';
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    ).subscribe(({ url }) => {
      this.setActiveTab(url);
    })
  }

  public goToPage(path: string): void {
    this.router.navigate([path]);
  }

  private setActiveTab(url: string): void {
    const tabFound = this.tabs.find(tab => tab.name === url.split('/')[3]);
    if (tabFound) {
      this.activeTab = tabFound.id;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
