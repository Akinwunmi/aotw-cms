import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsComponent } from './topics.component';

describe('TopicsComponent', () => {
  let component: TopicsComponent;
  let fixture: ComponentFixture<TopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TopicsComponent, HttpClientTestingModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopicsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
