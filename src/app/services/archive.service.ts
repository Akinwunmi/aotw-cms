import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ArchiveTopics } from '../models/archive.model';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private http = inject(HttpClient);

  public getArchive(): Observable<ArchiveTopics> {
    return this.http.get<ArchiveTopics>('assets/mock/regions.json');
  }
}
