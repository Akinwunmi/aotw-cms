import { AotwIconRegistry } from '@aotw/components';

import { icons } from '../../../assets/icons';
import { ArchiveComponent } from './archive.component';

describe('ArchiveComponent', () => {
  AotwIconRegistry.register(icons);

  it('mounts', () => {
    cy.mount(ArchiveComponent);
  });
});
