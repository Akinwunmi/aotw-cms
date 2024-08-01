import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldInputComponent } from '../../components/form-field-input';
import { TranslationKeyPipe } from '../../pipes';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormFieldInputComponent, ReactiveFormsModule, TranslateModule, TranslationKeyPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public errorMessage = signal<string | null>(null);

  public form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  public goToSignUp(): void {
    this.router.navigate(['signup']);
  }

  public logIn(): void {
    const { email, password } = this.form.getRawValue();
    this.authService.logIn(email, password).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error) => {
        this.errorMessage.set(error.code);
      }
    });
  }
}
