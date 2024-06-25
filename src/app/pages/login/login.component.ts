import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AotwFormFieldComponent } from '@aotw/ng-components';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AotwFormFieldComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public errorMessage: string | null = null;
  public form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public logIn(): void {
    const { email, password } = this.form.getRawValue();
    this.authService.logIn(email, password).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error) => {
        this.errorMessage = error.code;
      }
    });
  }

  public goToSignUp(): void {
    this.router.navigate(['signup']);
  }
}
