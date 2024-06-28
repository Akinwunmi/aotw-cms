import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import '@aotw/components';
import {
  AotwDropdownDirective,
  AotwDynamicTextComponent,
  AotwIconComponent,
  AotwListItemComponent
} from '@aotw/ng-components';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services';
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
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private translate = inject(TranslateService);

  public headerMenuEnum = HeaderMenu;

  public currentLang!: string;
  public currentUser = this.authService.currentUser;

  public menuOpen?: HeaderMenu;
  public isTranslationMenuOpen = false;
  public menuMessage = 'COMMON.WELCOME';

  public ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  public goToHome(): void {
    this.router.navigate(['']);
  }

  public goToLogin(): void {
    this.router.navigate(['login']);
    this.menuOpen = undefined;
  }

  public goToMyFavorites(): void {
    this.router.navigate(['my-favorites']);
    this.menuOpen = undefined;
  }

  public logOut(): void {
    this.authService.logOut();
    this.menuMessage = 'COMMON.LOGGED_OUT';
  }

  public signUp(): void {
    this.router.navigate(['signup']);
    this.menuOpen = undefined;
  }

  public setMenuOpen(menu: HeaderMenu): void {
    this.menuOpen = menu;
  }

  public setTranslation(): void {
    this.translate.use(this.translate.currentLang === 'en' ? 'nl' : 'en');
    this.menuOpen = undefined;
  }
}
