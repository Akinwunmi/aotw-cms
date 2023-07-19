import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FiltersComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
