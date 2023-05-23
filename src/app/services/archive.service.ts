import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Archive, ArchiveTopics } from '../models/archive.model';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  public getArchives(): Observable<Archive[]> {
    return this.http.get<Archive[]>('assets/mock/archives.json');
  }

  public getArchive(id: string): Observable<ArchiveTopics> {
    return this.http.get<ArchiveTopics>(`assets/mock/archives/${id}.json`);
  }
}
