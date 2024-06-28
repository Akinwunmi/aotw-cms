import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

import { AuthUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth);

  private user = toSignal(user(this.firebaseAuth));
  public currentUser = computed<AuthUser | undefined>(() => {
    const user = this.user();
    return user
      ? { email: user.email, username: user.displayName } as AuthUser
      : undefined;
  });

  public signUp(username: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(response => updateProfile(response.user, { displayName: username }));

    return from(promise);
  }

  public logIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});

    return from(promise);
  }

  public logOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
