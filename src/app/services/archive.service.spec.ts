import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ArchiveService } from './archive.service';

describe('ArchiveService', () => {
  let service: ArchiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ArchiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
