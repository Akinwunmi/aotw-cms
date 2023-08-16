import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Archive } from '../../models/archive.model';
import { ArchiveService } from '../../services/archive.service';
import { SharedModule } from '../../shared';
import { FiltersComponent } from '../filters';
import { AotwIconComponent } from '../lib';
import { Layout } from 'src/app/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    AotwIconComponent,
    FiltersComponent,
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

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.archiveService.getArchives().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((archives) => {
      this.archives = archives;
      this.cdr.detectChanges();
    });
  }

  public goToArchive(id: string): void {
    this.router.navigate(['archive', id]);
  }

  public goToCreate(): void {
    this.router.navigate(['create']);
  }

  public setLayout(layout: Layout) {
    this.gridLayout = layout === Layout.Grid;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
