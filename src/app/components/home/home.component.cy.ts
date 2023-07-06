import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AotwIconRegistry } from '@aotw/components';

import { icons } from '../../../assets/icons';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  AotwIconRegistry.register(icons);

  it('mounts', () => {
    cy.mount(HomeComponent, {
      imports: [HttpClientTestingModule]
    });
  });
});
