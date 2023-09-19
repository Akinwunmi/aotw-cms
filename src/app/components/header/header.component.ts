import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import '@aotw/components';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SharedModule } from '../../shared';
import {
  AotwDropdownComponent,
  AotwDynamicTextComponent,
  AotwIconComponent,
  AotwListItemComponent,
} from '../lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule,
    AotwDropdownComponent,
    AotwDynamicTextComponent,
    AotwIconComponent,
    AotwListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  @HostBinding('class.create')
  @Input()
  public createMode = false;

  public currentLang!: string;

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

  // ! Update once menu with "Translation" item is implemented
  public setTranslation(): void {
    this.translate.use(this.translate.currentLang === 'en' ? 'nl' : 'en');
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
