import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ArchiveService } from '../../services/archive.service';
import { Archive } from '../../models/archive.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public archives!: Archive[];

  constructor(private archiveService: ArchiveService, private router: Router) {}

  public ngOnInit(): void {
    this.archiveService.getArchives().subscribe(archives => {
      this.archives = archives;
    });
  }

  public goToArchive(id: string): void {
    this.router.navigate(['archive', id]);
  }

  public goToCreate(): void {
    this.router.navigate(['create']);
  }
}
