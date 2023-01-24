import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Archive } from './archive.model';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  constructor(private http: HttpClient) {}

  public getArchives(): Observable<Archive[]> {
    const { url, archives } = environment.api;
    return this.http.get<Archive[]>(url + archives);
  }
}
