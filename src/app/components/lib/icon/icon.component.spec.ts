import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwIconComponent } from './icon.component';

describe('AotwIconComponent', () => {
  let component: AotwIconComponent;
  let fixture: ComponentFixture<AotwIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwIconComponent]
    });
    fixture = TestBed.createComponent(AotwIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
