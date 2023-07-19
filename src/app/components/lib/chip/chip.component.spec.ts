import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwChipComponent } from './chip.component';

describe('AotwChipComponent', () => {
  let component: AotwChipComponent;
  let fixture: ComponentFixture<AotwChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwChipComponent]
    });
    fixture = TestBed.createComponent(AotwChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
