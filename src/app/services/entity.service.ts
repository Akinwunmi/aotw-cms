import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
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

  public setImageRange(entity: Entity, selectedYear?: number): Entity {
    const { ranges } = entity;

    if (!ranges) {
      return entity;
    }

    if (ranges.length === 1) {
      const { id, imageUrl } = ranges.slice(-1)[0];
      return {
        ...entity,
        id: id ?? entity.id,
        imageUrl: imageUrl ?? entity.imageUrl,
      };
    }

    if (!selectedYear) {
      return entity;
    }

    const range = ranges.reduce((prev, curr) => {
      if (curr.start && selectedYear - curr.start >= 0) {
        return curr;
      }
      if (prev.start && selectedYear - prev.start >= 0) {
        return prev;
      }
      return {};
    });

    const { id, imageUrl } = range;
    return {
      ...entity,
      id: id ?? entity.id,
      imageUrl: imageUrl ?? entity.imageUrl,
    };
  }
}
