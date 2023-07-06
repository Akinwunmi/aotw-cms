import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DiscoverComponent } from './discover.component';

describe('DiscoverComponent', () => {
  it('mounts', () => {
    cy.mount(DiscoverComponent, {
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });
});
