import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwListItemComponent } from './list-item.component';

describe('AotwListItemComponent', () => {
  let component: AotwListItemComponent;
  let fixture: ComponentFixture<AotwListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwListItemComponent]
    });
    fixture = TestBed.createComponent(AotwListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
