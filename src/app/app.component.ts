import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
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

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  public ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).urlAfterRedirects),
      takeUntil(this.unsubscribe$)
    ).subscribe(urlAfterRedirects => {
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
}
