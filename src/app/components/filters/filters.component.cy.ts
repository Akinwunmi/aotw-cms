import { AotwIconRegistry } from '@aotw/components';

import { icons } from '../../../assets/icons';
import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  AotwIconRegistry.register(icons);

  it('mounts', () => {
    cy.mount(FiltersComponent);
  });
});
