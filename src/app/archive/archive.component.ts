import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnDestroy, OnInit {
  public activeTab = 0;

  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    const childPage = this.router.url.split('/')[2];
    if (childPage === 'search') {
      this.activeTab = 0;
    }
    if (childPage === 'discover') {
      this.activeTab = 1;
    }
  }

  public goToPage(path: string): void {
    this.router.navigate([path]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
