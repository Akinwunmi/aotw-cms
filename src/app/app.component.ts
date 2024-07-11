import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ApplicationFooterComponent } from './components/application-footer';
import { ApplicationHeaderComponent } from './components/application-header';
import { UserService } from './services';

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
  private translate = inject(TranslateService);
  private userService = inject(UserService);
  
  public ngOnInit(): void {
    this.setDefaultLanguage();
  }

  private setDefaultLanguage(): void {
    this.translate.setDefaultLang('en');
    this.userService.getUser().subscribe((user) => {
      this.translate.use(user.language || 'en');
    });
  }
}
