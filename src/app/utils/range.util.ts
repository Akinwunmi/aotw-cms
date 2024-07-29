import { Entity } from '../models';

export function setImageRange(entity: Entity, selectedYear?: number): Entity {
  const { ranges } = entity;

  if (!ranges) {
    return entity;
  }

  if (ranges.length === 1) {
    const { imageUrl, translationKey } = ranges.slice(-1)[0];
    return {
      ...entity,
      imageUrl: imageUrl ?? entity.imageUrl,
      translationKey: translationKey ?? entity.translationKey,
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

  const { imageUrl, translationKey } = range;
  return {
    ...entity,
    imageUrl: imageUrl ?? entity.imageUrl,
    translationKey: translationKey ?? entity.translationKey,
  };
}
