import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FlagFormFieldComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PageHeaderComponent } from '../../components/page-header';
import { AuthService, UserService } from '../../services';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [FlagFormFieldComponent, PageHeaderComponent, TranslateModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  private currentUser = toSignal(this.userService.getUser());
  public user = computed(() => ({
    ...this.authService.currentUser(),
    ...this.currentUser()
  }));

  public setFullName(name?: string, surname?: string): string {
    if (name && !surname) {
      return name;
    }

    if (!name && surname) {
      return surname;
    }

    if (!name && !surname) {
      return '\u2014';
    }

    return `${name} ${surname}`;
  }
}
