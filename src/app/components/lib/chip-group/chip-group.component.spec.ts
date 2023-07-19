import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwChipGroupComponent } from './chip-group.component';

describe('AotwChipGroupComponent', () => {
  let component: AotwChipGroupComponent;
  let fixture: ComponentFixture<AotwChipGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwChipGroupComponent]
    });
    fixture = TestBed.createComponent(AotwChipGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
