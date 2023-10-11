import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AotwIconComponent, AotwTabGroupComponent, Tab } from '@aotw/lib-ng';
import { filter, map, Subject, takeUntil } from 'rxjs';

import { SharedModule } from '../../shared';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    SharedModule,
    AotwIconComponent,
    AotwTabGroupComponent,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnDestroy, OnInit {
  public archiveId!: string;

  public showHeader = true;
  public tabs: Tab[] = [
    {
      id: 0,
      name: 'search',
      label: 'COMMON.SEARCH',
      disabled: false
    },
    {
      id: 1,
      name: 'discover',
      label: 'COMMON.DISCOVER',
      disabled: false
    }
  ];
  public activeTab = 0;

  private location = inject(Location);
  private router = inject(Router);

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.archiveId = this.router.url.split('/')[2];
    this.setActiveTab(this.router.url);
    this.showHeader = !this.router.url.includes('edit');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      takeUntil(this.unsubscribe$)
    ).subscribe(url => {
      const editing = url.includes('edit');
      this.showHeader = !editing;
      if (!editing) {
        this.setActiveTab(url);
      }
    });
  }

  public goToPage(path: string): void {
    this.router.navigate(['archive', this.archiveId, path]);
  }

  public goToPreviousPage(): void {
    this.location.back();
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
