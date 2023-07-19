import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        HeaderComponent,
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have \'aotw-cms\' as title', () => {
    expect(component.title).toEqual('aotw-cms');
  });
});
