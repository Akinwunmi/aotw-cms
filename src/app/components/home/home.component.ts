import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { ArchiveService } from '../../services/archive.service';
import { Archive } from '../../models/archive.model';
import { FiltersComponent } from '../filters';
import { AotwIconComponent } from '../lib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AotwIconComponent,
    FiltersComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {
  public archives!: Archive[];

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

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
