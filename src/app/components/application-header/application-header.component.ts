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
  FlagButtonDirective,
  FlagCardComponent,
  FlagDropdownDirective,
  FlagIconComponent,
  FlagListItemComponent,
  FlagPillComponent,
} from '@flagarchive/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { DefaultEntity } from '../../models';
import { AuthService } from '../../services';

import { HeaderMenu } from './application-header.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FlagButtonDirective,
    FlagCardComponent,
    FlagDropdownDirective,
    FlagIconComponent,
    FlagListItemComponent,
    FlagPillComponent,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss'],
})
export class ApplicationHeaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  public headerMenuEnum = HeaderMenu;

  public currentLang!: string;
  public currentUser = this.authService.currentUser;

  public menuOpen?: HeaderMenu;
  public isTranslationMenuOpen = false;

  public ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  public goToHome(): void {
    this.router.navigate(['discover', 'entity', DefaultEntity.Continents]);
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

  public setMenuOpen(menu: HeaderMenu, closed?: boolean): void {
    this.menuOpen = closed ? undefined : menu;
  }

  public setTranslation(): void {
    this.translate.use(this.translate.currentLang === 'en' ? 'nl' : 'en');
    this.menuOpen = undefined;
  }
}
