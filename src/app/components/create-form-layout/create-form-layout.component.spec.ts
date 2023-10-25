import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormLayoutComponent } from './create-form-layout.component';

describe('CreateFormLayoutComponent', () => {
  let component: CreateFormLayoutComponent;
  let fixture: ComponentFixture<CreateFormLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateFormLayoutComponent]
    });
    fixture = TestBed.createComponent(CreateFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
