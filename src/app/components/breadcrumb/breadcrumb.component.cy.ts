import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  it('mounts', () => {
    cy.mount(BreadcrumbComponent);
  });

  it('should display breadcrumb items', () => {
    cy.mount(BreadcrumbComponent, {
      componentProperties: {
        items: [
          { title: 'Breadcrumb item 1' },
          { title: 'Breadcrumb item 2' },
        ]
      },
      imports: [RouterTestingModule]
    });
    cy.get('[data-cy=breadcrumb-item]').eq(1).should('contains.text', 'Breadcrumb item 2');
    cy.get('[data-cy=breadcrumb-item]').should('have.length', 2);
  });
});
