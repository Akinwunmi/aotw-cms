import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwTabGroupComponent } from './tab-group.component';

describe('AotwTabGroupComponent', () => {
  let component: AotwTabGroupComponent;
  let fixture: ComponentFixture<AotwTabGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwTabGroupComponent]
    });
    fixture = TestBed.createComponent(AotwTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
