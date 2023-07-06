import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidePanelService {
  private state$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  public getState(): Observable<boolean> {
    return this.state$;
  }

  public open(): void {
    this.state$.next(true);
  }

  public close(): void {
    this.state$.next(false);
  }
}
