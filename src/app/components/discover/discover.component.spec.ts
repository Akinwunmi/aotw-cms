import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AotwIconRegistry } from '@aotw/components';
import { of } from 'rxjs';

import { icons } from '../../../assets/icons';
import { ArchiveTopics } from '../../models';
import { ArchiveService } from '../../services/archive.service';

import { DiscoverComponent } from './discover.component';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  let archiveService: ArchiveService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DiscoverComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;

    archiveService = TestBed.inject(ArchiveService);

    AotwIconRegistry.register(icons);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set archive data', () => {
    const archiveDataStub: ArchiveTopics = {
      id: '23flag01',
      name: 'Flags',
      topics: [
        { id: 'af', name: 'Africa' }
      ]
    };

    spyOn(archiveService, 'getArchive').and.returnValue(
      of(archiveDataStub)
    );
    fixture.detectChanges();

    expect(component.archiveData).toEqual(archiveDataStub);
  });
});
