import { ArchiveTopics, Topic } from '../../models';

export const childTopicsStub: Topic[] = [
  {
    id: 'af-dza',
    name: 'Algeria',
    image: true,
    type: 'Country'
  },
  {
    id: 'af-ago',
    name: 'Angola',
    image: true,
    type: 'Country'
  }
];

export const archiveDataStub: ArchiveTopics = {
  id: '23flag01',
  name: 'Flags',
  topics: [
    {
      id: 'af',
      name: 'Africa',
      type: 'Continent'
    },
    ...childTopicsStub
  ]
};
