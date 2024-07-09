import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconService } from '@flagarchive/angular';
import { TranslateService } from '@ngx-translate/core';

import { ICONS } from '../assets/images/icons';

import { ApplicationFooterComponent } from './components/application-footer';
import { ApplicationHeaderComponent } from './components/application-header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ApplicationFooterComponent,
    ApplicationHeaderComponent,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private iconService = inject(IconService);
  private translate = inject(TranslateService);
  
  public ngOnInit(): void {
    this.iconService.register(ICONS);
    this.setDefaultLanguage();
  }

  private setDefaultLanguage(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
