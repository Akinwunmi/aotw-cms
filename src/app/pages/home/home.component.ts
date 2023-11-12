import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AotwIconComponent } from '@aotw/lib-ng';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { AdvancedSearchComponent } from '../../components/advanced-search';
import { Archive, Layout } from '../../models';
import { ArchiveService } from '../../services';
import { SharedModule } from '../../shared';
import { selectLayout } from '../../state/selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    AdvancedSearchComponent,
    AotwIconComponent
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

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
