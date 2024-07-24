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

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly firebaseAuth = inject(Auth);
  private readonly userService = inject(UserService);

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
    this.userService.favorites.set([]);
    this.userService.roles.set([]);
    return from(promise);
  }
}
