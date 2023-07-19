import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwLabelComponent } from './label.component';

describe('AotwLabelComponent', () => {
  let component: AotwLabelComponent;
  let fixture: ComponentFixture<AotwLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwLabelComponent]
    });
    fixture = TestBed.createComponent(AotwLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
