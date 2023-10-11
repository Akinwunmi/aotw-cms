import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormGeneralInfoComponent } from './create-form-general-info.component';

describe('CreateFormGeneralInfoComponent', () => {
  let component: CreateFormGeneralInfoComponent;
  let fixture: ComponentFixture<CreateFormGeneralInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateFormGeneralInfoComponent]
    });
    fixture = TestBed.createComponent(CreateFormGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
