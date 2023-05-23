import { Image } from './image.model';

interface DefaultInfo {
  id: string;
  name: string;
}

export interface Archive extends DefaultInfo {
  image: Image;
}

export interface ArchiveTopics extends DefaultInfo {
  topics: Topic[];
}

export interface Topic extends DefaultInfo {
  image?: Image;
}
