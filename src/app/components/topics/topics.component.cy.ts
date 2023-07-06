import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TopicsComponent } from './topics.component';

describe('TopicsComponent', () => {
  it('mounts', () => {
    cy.mount(TopicsComponent, {
      imports: [HttpClientTestingModule]
    });
  });

  it('should display topics', () => {
    cy.mount(TopicsComponent, {
      componentProperties: {
        topics: [
          { id: '0001', name: 'Bulbasaur' },
          { id: '0002', name: 'Ivysaur' },
          { id: '0003', name: 'Venusaur' }
        ]
      },
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    cy.get('[data-cy="topic-name"]').eq(1).should('contains.text', 'Ivysaur');
    cy.get('[data-cy="topic-name"]').should('have.length', 3);
  });
});
