export enum EntityKey {
  AltId = 'altId',
  Id = 'id',
  ImageUrl = 'imageUrl',
  Parent = 'parent',
  Ranges = 'ranges',
  TranslationKey = 'translationKey',
  Type = 'type',
}

export enum EntityRangeKey {
  End = 'end',
  ImageUrl = EntityKey.ImageUrl,
  Parent = EntityKey.Parent,
  Start = 'start',
  TranslationKey = EntityKey.TranslationKey,
  Type = EntityKey.Type,
}

export enum EntityType {
  AutonomousIsland = 'autonomous_island',
  Continent = 'continent',
  Country = 'country',
  Organization = 'organization',
}

export interface EntityRange {
  [EntityRangeKey.End]?: number;
  [EntityRangeKey.ImageUrl]?: string;
  [EntityRangeKey.Parent]?: string;
  [EntityRangeKey.Start]?: number;
  [EntityRangeKey.TranslationKey]?: string;
  [EntityRangeKey.Type]?: string;
}

export interface Entity {
  baseId: string;
  [EntityKey.Id]: string;
  [EntityKey.TranslationKey]: string;
  [EntityKey.Type]: EntityType;
  [EntityKey.AltId]?: string;
  [EntityKey.ImageUrl]?: string;
  [EntityKey.Parent]?: string;
  [EntityKey.Ranges]?: EntityRange[];
}

export interface EntityWithoutBaseId extends Omit<Entity, 'baseId'> {}
