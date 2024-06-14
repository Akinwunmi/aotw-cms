import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import '@aotw/components';
import { Router } from '@angular/router';
import {
  AotwDropdownDirective,
  AotwDynamicTextComponent,
  AotwIconComponent,
  AotwListItemComponent
} from '@aotw/ng-components';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { SHARED_IMPORTS } from '../../shared';

import { HeaderMenu } from './header.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    AotwDropdownDirective,
    AotwDynamicTextComponent,
    AotwIconComponent,
    AotwListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  public headerMenuEnum = HeaderMenu;

  public currentLang!: string;

  public menuOpen?: HeaderMenu;
  public isTranslationMenuOpen = false;

  private router = inject(Router);
  private translate = inject(TranslateService);

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translate.onLangChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  public goToHome(): void {
    this.router.navigate(['']);
  }

  public setMenuOpen(menu: HeaderMenu): void {
    this.menuOpen = menu;
  }

  public setTranslation(): void {
    this.translate.use(this.translate.currentLang === 'en' ? 'nl' : 'en');
    this.menuOpen = undefined;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
