import { Injectable, computed, inject, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import { EMPTY, Observable, from, map, switchMap, tap } from 'rxjs';

import { DatabaseCollection, User, UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  private docRef$ = user(this.firebaseAuth).pipe(
    map(user => user ? doc(this.firestore, `${DatabaseCollection.Users}/${user.uid}`) : undefined),
  );

  public favorites = signal<string[]>([]);
  public roles = signal<UserRole[]>([]);

  public isAdmin = computed(() => this.roles().includes(UserRole.Admin));

  public addUser(name: string, surname: string): Observable<void> {
    return this.docRef$.pipe(
      switchMap(docRef => {
        if (!docRef) {
          return EMPTY;
        }

        const promise = setDoc(docRef, { favorites: [], name, surname });
        return from(promise);
      })
    );
  }

  public getUser(): Observable<User> {
    return this.docRef$.pipe(
      switchMap(docRef => {
        if (!docRef) {
          return EMPTY;
        }

        const promise = getDoc(docRef).then(snapshot => snapshot.data() as User);
        return from(promise).pipe(
          tap(user => {
            this.favorites.set(user.favorites);
            this.roles.set(user.roles ?? []);
          })
        );
      })
    );
  }

  public addFavorite(id: string): Observable<User> {
    return this.docRef$.pipe(
      switchMap(docRef => {
        if (!docRef) {
          return EMPTY;
        }

        const promise = updateDoc(docRef, { favorites: arrayUnion(id) });
        return from(promise).pipe(
          switchMap(() => this.getUser()),
          tap(user => this.favorites.set(user.favorites))
        );
      })
    );
  }

  public removeFavorite(id: string): Observable<User> {
    return this.docRef$.pipe(
      switchMap(docRef => {
        if (!docRef) {
          return EMPTY;
        }

        const promise = updateDoc(docRef, { favorites: arrayRemove(id) });
        return from(promise).pipe(
          switchMap(() => this.getUser()),
          tap(user => this.favorites.set(user.favorites))
        );
      })
    );
  }
}
