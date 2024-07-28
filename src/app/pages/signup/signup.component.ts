import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap } from 'rxjs';

import { FormFieldInputComponent } from '../../components/form-field-input';
import { TranslationKeyPipe } from '../../pipes';
import { AuthService, UserService } from '../../services';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormFieldInputComponent, ReactiveFormsModule, TranslateModule, TranslationKeyPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  public errorMessage = signal<string | null>(null);

  public form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  public goToLogIn(): void {
    this.router.navigate(['login']);
  }

  public signUp(): void {
    const { username, name, surname, email, password } = this.form.getRawValue();
    this.authService.signUp(username, email, password).pipe(
      switchMap(() => this.userService.addUser(name, surname))
    ).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.code);
      },
    });
  }
}
