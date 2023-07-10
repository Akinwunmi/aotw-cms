import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import '@aotw/components';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import {
  AotwDropdownComponent,
  AotwDynamicTextComponent,
  AotwIconComponent,
  AotwListItemComponent,
} from '../lib';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AotwDropdownComponent,
    AotwDynamicTextComponent,
    AotwIconComponent,
    AotwListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.create')
  @Input()
  public createMode = false;

  public currentLang!: string;

  private router = inject(Router);
  private translate = inject(TranslateService);

  public ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
  }

  public goToHome(): void {
    this.router.navigate(['']);
  }

  // ! Update once menu with "Translation" item is implemented
  public setTranslation(): void {
    this.currentLang = this.translate.currentLang === 'en' ? 'nl' : 'en';
    this.translate.use(this.currentLang);
  }
}
