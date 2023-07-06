import { AotwIconRegistry } from '@aotw/components';

import { icons } from '../../../assets/icons';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  AotwIconRegistry.register(icons);

  it('mounts', () => {
    cy.mount(SearchComponent);
  });
});
