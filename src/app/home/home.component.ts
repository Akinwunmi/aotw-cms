import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Archive, ArchiveService } from '../services/archive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private archives!: Archive[];
  public filteredArchives!: Archive[];

  private activeFilters: string[] = [];
  public showSearchBar = false;

  public viewFilter: { name: 'grid' | 'list'; active: boolean }[] = [
    { name: 'grid', active: true },
    { name: 'list', active: false }
  ];
  public activeView: 'grid' | 'list' = 'grid';


  constructor(private archiveService: ArchiveService, private router: Router) {}

  public ngOnInit(): void {
    this.archiveService.getArchives().subscribe(archives => {
      this.archives = archives;
      this.filteredArchives = this.archives;
    })
  }

  public goToArchive(name: string): void {
    this.router.navigate(['archive/' + name]);
  }

  public goToCreate(): void {
    this.router.navigate(['create']);
  }

  // TODO Convert to generic filter service or util
  public setFilter(type: string): void {
    if (this.activeFilters.includes(type)) {
      this.filteredArchives = this.archives;
      this.activeFilters = this.activeFilters.filter(activeFilter => activeFilter !== type);
    } else {
      this.activeFilters = [...this.activeFilters, type];
      if (type === 'a-z') {
        this.filteredArchives = [...this.archives].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
  
          return 0;
        });
      }
    }
  }

  public setView(name: 'grid' | 'list'): void {
    this.viewFilter.forEach(view => {
      view.active = false;
      if (view.name === name) {
        view.active = true;
      }
    });
    this.activeView = name;
  }

  public toggleSearchBar(): void {
    this.showSearchBar = !this.showSearchBar;
  }
}
