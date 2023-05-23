import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, Subject } from 'rxjs';

import { Tab } from '../../models';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnDestroy, OnInit {
  public archiveId!: string;

  public tabs: Tab[] = [
    { id: 0, name: 'search', label: 'Search', disabled: false },
    { id: 1, name: 'discover', label: 'Discover', disabled: false }
  ];
  public activeTab = 0;

  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.archiveId = this.router.url.split('/')[2];
    this.setActiveTab(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    ).subscribe(({ url }) => {
      this.setActiveTab(url);
    });
  }

  public goToPage(path: string): void {
    this.router.navigate(['archive', this.archiveId, path]);
  }

  private setActiveTab(url: string): void {
    const tabFound = this.tabs.find(tab => tab.name === url.split('/')[3]);
    if (!tabFound) {
      return;
    }
    if (this.activeTab !== tabFound.id) {
      this.activeTab = tabFound.id;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
