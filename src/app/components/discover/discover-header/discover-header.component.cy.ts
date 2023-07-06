import { AotwIconRegistry } from '@aotw/components';

import { icons } from '../../../../assets/icons';
import { DiscoverHeaderComponent } from './discover-header.component';

describe('DiscoverHeaderComponent', () => {
  AotwIconRegistry.register(icons);

  it('mounts', () => {
    cy.mount(DiscoverHeaderComponent, {
      componentProperties: {
        topic: { id: '', name: '' }
      }
    });
  });
});
