import { EntityKey, EntityRange, EntityWithoutBaseId } from '../models';

// If the entity key is empty, remove it from the entity object
export function parseEntity(entity: EntityWithoutBaseId): EntityWithoutBaseId {
  Object.keys(entity).forEach((rawKey) => {
    const key = rawKey as keyof EntityWithoutBaseId;
    const isEmptyArray = Array.isArray(entity[key]) && entity[key]?.length === 0;
    const isNull = entity[key] === null;
    const ranges = entity[key as EntityKey.Ranges];

    if (ranges && key === EntityKey.Ranges) {
      // If the range key is empty, remove it from the range object
      // If the value should be a number, convert it to a number
      entity[key] = ranges.map(rawRange => {
        const range = {
          ...rawRange,
          start: Number(rawRange.start),
          end: rawRange.end ? Number(rawRange.end) : undefined,
        };
        Object.keys(range).forEach((rawRangeKey) => {
          const rangeKey = rawRangeKey as keyof EntityRange;
          if (!range[rangeKey]) {
            delete range[rangeKey];
          }
        });
        return range;
      });
    }

    if (isEmptyArray || isNull) {
      delete entity[key];
    }
  });

  return entity;
}
