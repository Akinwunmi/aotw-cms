import { Image } from './image.model';

interface DefaultInfo {
  id: string;
  name: string;
}

export interface Archive extends DefaultInfo {
  image: Image;
}

export interface ArchiveTopics extends DefaultInfo {
  parentType?: string;
  topics: Topic[];
}

export interface Range {
  start?: number;
  end?: number;
  image?: boolean;
}

export interface Topic extends DefaultInfo {
  type?: string;
  image?: boolean;
  imageUrl?: string;
  parent?: string;
  ranges?: Range[];
}

export interface TopicWithRange extends Topic {
  rangeSuffix?: string;
}
