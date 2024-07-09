import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  FlagDropdownDirective,
  FlagListItemComponent,
  FlagIconComponent,
  ButtonDirective
} from '@flagarchive/angular';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services';
import { SHARED_IMPORTS } from '../../shared';

import { HeaderMenu } from './application-header.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    ButtonDirective,
    FlagDropdownDirective,
    FlagListItemComponent,
    FlagIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss'],
})
export class ApplicationHeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private translate = inject(TranslateService);

  public headerMenuEnum = HeaderMenu;

  public currentLang!: string;
  public currentUser = this.authService.currentUser;

  public menuOpen?: HeaderMenu;
  public isTranslationMenuOpen = false;
  public menuMessage!: string;

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

  public goToPage(name: string): void {
    this.router.navigate([name]);
    this.menuOpen = undefined;
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
    this.menuOpen = undefined;
  }

  public setMenuOpen(menu: HeaderMenu): void {
    this.menuOpen = menu;
    this.menuMessage = 'COMMON.WELCOME';
  }

  public setTranslation(): void {
    this.translate.use(this.translate.currentLang === 'en' ? 'nl' : 'en');
    this.menuOpen = undefined;
  }
}
