import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AotwIconRegistry } from '@aotw/components';
import icons from '@aotw/core/dist/icons/icons.json';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, Subject, takeUntil } from 'rxjs';

import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public createMode!: boolean;
  public title = 'aotw-cms';

  private renderer = inject(Renderer2);
  private router = inject(Router);
  private translate = inject(TranslateService);

  private unsubscribe$ = new Subject<void>();

  public constructor() {
    AotwIconRegistry.register(icons);
  }

  public ngOnInit(): void {
    this.setDefaultLanguage();

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).urlAfterRedirects),
      takeUntil(this.unsubscribe$)
    ).subscribe((urlAfterRedirects) => {
      const path = urlAfterRedirects.split('/');
      this.createMode = path[1] === 'create';
      this.createMode
        ? this.renderer.addClass(document.body, 'create')
        : this.renderer.removeClass(document.body, 'create');
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setDefaultLanguage(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
