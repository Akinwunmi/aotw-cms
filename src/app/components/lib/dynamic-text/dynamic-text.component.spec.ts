import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwDynamicTextComponent } from './dynamic-text.component';

describe('AotwDynamicTextComponent', () => {
  let component: AotwDynamicTextComponent;
  let fixture: ComponentFixture<AotwDynamicTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwDynamicTextComponent]
    });
    fixture = TestBed.createComponent(AotwDynamicTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
