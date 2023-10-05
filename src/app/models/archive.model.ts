import { ArchiveLayout } from '../pages/create/create.model';

import { Image } from './image.model';

interface DefaultInfo {
  id: string;
  name: string;
}

interface ArchiveGeneralInfo extends DefaultInfo {
  mainCategory: string;
  topics: Topic[];
}

export interface ArchiveData {
  generalInfo: ArchiveGeneralInfo;
  layout: ArchiveLayout;
}

export interface Archive extends DefaultInfo {
  image: Image;
}

export interface ArchiveTopics extends DefaultInfo {
  parentType?: string;
  topics: Topic[];
}

export interface Topic extends DefaultInfo {
  type?: string;
  image?: boolean;
  parent?: string;
}
