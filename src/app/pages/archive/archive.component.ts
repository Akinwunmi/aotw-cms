import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AotwIconComponent, AotwTabGroupComponent, Tab } from '@aotw/ng-components';
import { TranslateService } from '@ngx-translate/core';
import { map, Subject, takeUntil } from 'rxjs';

import { SHARED_IMPORTS } from '../../shared';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    AotwIconComponent,
    AotwTabGroupComponent,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnDestroy, OnInit {
  public tabs!: Tab[];
  public activeTab = 0;

  private router = inject(Router);
  private translate = inject(TranslateService);

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.translate.stream(['COMMON.SEARCH', 'COMMON.DISCOVER']).pipe(
      map(translations => Object.values(translations) as string[]),
      takeUntil(this.unsubscribe$)
    ).subscribe(labels => {
      this.tabs = labels.map((label, index) => ({
        id: index,
        name: index === 0 ? 'search' : 'discover',
        label,
        disabled: false
      }));
    });

    this.setActiveTab(this.router.url);
  }

  public goToPage(path: string): void {
    this.router.navigate([path]);
  }

  private setActiveTab(url: string): void {
    const tabFound = this.tabs.find(tab => tab.name === url.split('/')[1]);
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
