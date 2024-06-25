import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AotwFormFieldComponent } from '@aotw/ng-components';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../services';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AotwFormFieldComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public errorMessage: string | null = null;
  public form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public signUp(): void {
    const { username, email, password } = this.form.getRawValue();
    this.authService.signUp(username, email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.code;
        this.cdr.markForCheck();
      },
    });
  }

  public goToLogIn(): void {
    this.router.navigate(['login']);
  }
}
