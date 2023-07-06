import { AotwIconRegistry } from '@aotw/components';

import { icons } from '../../../assets/icons';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  AotwIconRegistry.register(icons);

  it('mounts', () => {
    cy.mount(HeaderComponent);
  });
});
