interface DefaultInfo {
  id: string;
  name: string;
}

export interface ArchiveTopics extends DefaultInfo {
  parentType?: string;
  topics: Topic[];
}

export interface Range extends Omit<Topic, 'id' | 'altId' | 'name' | 'ranges'> {
  start?: number;
  end?: number;
  id?: string;
  name?: string;
}

export interface Topic extends DefaultInfo {
  altId?: string;
  type?: string;
  image?: boolean;
  imageUrl?: string;
  parent?: string;
  ranges?: Range[];
}

export interface TopicWithRange extends Topic {
  rangeSuffix?: string;
}
