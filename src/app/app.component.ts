import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AotwIconRegistry } from '@aotw/components';
import icons from '@aotw/core/dist/icons/icons.json';
import { TranslateService } from '@ngx-translate/core';

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
export class AppComponent implements OnInit {
  public title = 'aotw-cms';

  private translate = inject(TranslateService);

  public constructor() {
    AotwIconRegistry.register(icons);
  }

  public ngOnInit(): void {
    this.setDefaultLanguage();
  }

  private setDefaultLanguage(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
