import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { ArchiveComponent } from './archive.component';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArchiveComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          }
        }),
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
