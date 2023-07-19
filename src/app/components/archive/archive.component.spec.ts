import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RouterModule
} from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { of } from 'rxjs';

import { ArchiveComponent } from './archive.component';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;
  let location: Location;
  let router: Router;

  const mockUrl = '/archive/23flag01/discover/topics/af';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArchiveComponent,
        RouterModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          }
        }),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: Location,
          useValue: {
            back: jasmine.createSpy('back')
          }
        },
        {
          provide: Router,
          useValue: {
            url: mockUrl,
            events: of(new NavigationEnd(0, mockUrl, mockUrl)),
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should navigate to the correct page', () => {
    fixture.detectChanges();
    component.goToPage('search');

    expect(router.navigate).toHaveBeenCalledWith(
      ['archive', '23flag01', 'search']
    );
  });

  it('should navigate to previous page', () => {
    fixture.detectChanges();
    component.goToPreviousPage();

    expect(location.back).toHaveBeenCalled();
  });
});
