import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverHeaderComponent } from './discover-header.component';

describe('DiscoverHeaderComponent', () => {
  let component: DiscoverHeaderComponent;
  let fixture: ComponentFixture<DiscoverHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DiscoverHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
