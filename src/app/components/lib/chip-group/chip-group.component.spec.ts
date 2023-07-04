import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipGroupComponent } from './chip-group.component';

describe('ChipGroupComponent', () => {
  let component: ChipGroupComponent;
  let fixture: ComponentFixture<ChipGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChipGroupComponent]
    });
    fixture = TestBed.createComponent(ChipGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
