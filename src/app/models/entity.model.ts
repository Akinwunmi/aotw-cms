export enum EntityType {
  AutonomousIsland = 'autonomous_island',
  Continent = 'continent',
  Country = 'country',
  Organization = 'organization',
}

export interface EntityRange {
  end?: number;
  id?: string;
  imageUrl?: string;
  parent?: string;
  start?: number;
}

export interface Entity {
  baseId: string;
  id: string;
  type: EntityType;
  altId?: string;
  imageUrl?: string;
  parent?: string;
  ranges?: EntityRange[];
}

// ? - Is this needed?
export interface EntityWithRangeSuffix extends Entity {
  rangeSuffix?: string;
}