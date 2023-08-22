import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { Archive, Layout } from '../../models';
import { ArchiveService } from '../../services';
import { SharedModule } from '../../shared';
import { selectLayout } from '../../state/selectors';
import { FiltersAndSortingComponent } from '../filters-and-sorting';
import { AotwIconComponent } from '../lib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    AotwIconComponent,
    FiltersAndSortingComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {
  public archives!: Archive[];

  public gridLayout = true;

  private archiveService = inject(ArchiveService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private store = inject(Store);

  private unsubscribe$ = new Subject<void>();
  private selectLayout$ = this.store.select(selectLayout);

  public ngOnInit(): void {
    this.archiveService.getArchives().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(archives => {
      this.archives = archives;
      this.cdr.detectChanges();
    });

    this.selectLayout$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(layout => {
      this.gridLayout = layout === Layout.Grid;
    });
  }

  public goToArchive(id: string): void {
    this.router.navigate(['archive', id]);
  }

  public goToCreate(): void {
    this.router.navigate(['create']);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
