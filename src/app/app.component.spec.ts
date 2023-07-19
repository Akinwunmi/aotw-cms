import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { AotwIconRegistry } from '@aotw/components';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { of } from 'rxjs';

import { icons } from '../assets/icons';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockUrl = '/create';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        HeaderComponent,
        RouterModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          }
        })
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: Router,
          useValue: {
            url: mockUrl,
            events: of(new NavigationEnd(0, mockUrl, mockUrl)),
            createUrlTree: (commands, options = {}) => {
              options;
            },
            serializeUrl: (commands, options = {}) => {
              options;
            }
          } as Router
        }
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    AotwIconRegistry.register(icons);
  });

  it('should create the app', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should have \'aotw-cms\' as title', () => {
    fixture.detectChanges();

    expect(component.title).toEqual('aotw-cms');
  });

  it('should add create class when path is \'create\'', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.create'))).toBeTruthy();
  });
});
