import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwDropdownComponent } from './dropdown.component';

describe('AotwDropdownComponent', () => {
  let component: AotwDropdownComponent;
  let fixture: ComponentFixture<AotwDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwDropdownComponent]
    });
    fixture = TestBed.createComponent(AotwDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
