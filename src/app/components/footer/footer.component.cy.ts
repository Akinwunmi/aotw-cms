import { RouterTestingModule } from '@angular/router/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('mounts', () => {
    cy.mount(FooterComponent, {
      imports: [RouterTestingModule]
    });
  });
});
