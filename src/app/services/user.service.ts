import { Injectable, inject } from '@angular/core';
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
import { EMPTY, Observable, from, switchMap } from 'rxjs';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  public addUser(): Observable<void> {
    return user(this.firebaseAuth).pipe(
      switchMap(user => {
        if (!user) {
          return EMPTY;
        }

        const docRef = doc(this.firestore, `users/${user.uid}`);
        const promise = setDoc(docRef, { favorites: [] });
        return from(promise);
      })
    );
  }

  public getUser(): Observable<User> {
    return user(this.firebaseAuth).pipe(
      switchMap(user => {
        if (!user) {
          return EMPTY;
        }

        const docRef = doc(this.firestore, `users/${user.uid}`);
        const promise = getDoc(docRef).then(snapshot => snapshot.data() as User);
        return from(promise);
      })
    );
  }

  public addFavorite(id: string): Observable<void> {
    return user(this.firebaseAuth).pipe(
      switchMap(user => {
        if (!user) {
          return EMPTY;
        }

        const docRef = doc(this.firestore, `users/${user.uid}`);
        const promise = updateDoc(docRef, { favorites: arrayUnion(id) });
        return from(promise);
      })
    );
  }

  public removeFavorite(id: string): Observable<void> {
    return user(this.firebaseAuth).pipe(
      switchMap(user => {
        if (!user) {
          return EMPTY;
        }

        const docRef = doc(this.firestore, `users/${user.uid}`);
        const promise = updateDoc(docRef, { favorites: arrayRemove(id) });
        return from(promise);
      })
    );
  }
}
