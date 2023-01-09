import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { archives } from './home.mock';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public archives = archives;

  constructor(private router: Router) {}

  public goToArchive(): void {
    this.router.navigate(['archive']);
  }

  public goToCreate(): void {
    this.router.navigate(['create']);
  }
}
