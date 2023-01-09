import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  public createMode!: boolean;
  public title = 'aotw-cms';

  private destroy$ = new Subject<void>();

  constructor(private renderer: Renderer2, private router: Router) {}

  public ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(({ urlAfterRedirects }) => {
      const path = urlAfterRedirects.split('/');
      this.createMode = path[1] === 'create';
      this.createMode
        ? this.renderer.addClass(document.body, 'create')
        : this.renderer.removeClass(document.body, 'create');
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
