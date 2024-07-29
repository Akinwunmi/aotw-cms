import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

import { DatabaseCollection, DatabaseKey, Entity, EntityWithoutBaseId } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private readonly firestore = inject(Firestore);

  private entities = collection(this.firestore, DatabaseCollection.Entities);

  public addEntity(entity: EntityWithoutBaseId): Observable<string> {
    const promise = addDoc(this.entities, entity).then(response => response.id);
    return from(promise);
  }

  public getEntityByBaseId(baseId: string): Observable<Entity> {
    const docRef = doc(this.firestore, DatabaseCollection.Entities, baseId);
    const promise = getDoc(docRef);
    return from(promise).pipe(
      map(entity => entity.data() as Entity),
    );
  }

  public getEntities(): Observable<Entity[]> {
    return (
      collectionData(this.entities, { idField: DatabaseKey.BaseId }) as Observable<Entity[]>
    ).pipe(
      map(entities => entities.sort((a, b) => {
        const idSuffixA = a.id.split('-').slice(-1)[0];
        const idSuffixB = b.id.split('-').slice(-1)[0];
        return idSuffixA.localeCompare(idSuffixB);
      })),
    );
  }

  public updateEntityByBaseId(baseId: string, entity: EntityWithoutBaseId): Observable<void> {
    const docRef = doc(this.firestore, DatabaseCollection.Entities, baseId);
    const promise = setDoc(docRef, entity);
    return from(promise);
  }
}
