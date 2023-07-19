import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AotwIconRegistry } from '@aotw/components';
import { of } from 'rxjs';

import { icons } from '../../../assets/icons';
import { ArchiveService } from '../../services';

import { TopicsComponent } from './topics.component';
import { archiveDataStub, childTopicsStub } from './topics.mock';

describe('TopicsComponent', () => {
  let component: TopicsComponent;
  let fixture: ComponentFixture<TopicsComponent>;

  let archiveService: ArchiveService;

  const mockUrl = '/archive/23flag01/discover/topic/af';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TopicsComponent, HttpClientTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: Router,
          useValue: {
            url: mockUrl,
            events: of(new NavigationEnd(0, mockUrl, mockUrl))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopicsComponent);
    component = fixture.componentInstance;

    archiveService = TestBed.inject(ArchiveService);

    AotwIconRegistry.register(icons);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set topics', () => {
    spyOn(archiveService, 'getArchive').and.returnValue(
      of(archiveDataStub)
    );
    fixture.detectChanges();

    expect(component.topics).toEqual(childTopicsStub);
  });

  it('should set parent label', () => {
    fixture.detectChanges();
    const parentLabel = component.setParentLabel('af-dza');

    expect(parentLabel).toEqual('dza');
  });
});
