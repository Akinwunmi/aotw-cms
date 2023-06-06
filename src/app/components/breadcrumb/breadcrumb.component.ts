import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbItem } from './breadcrumb.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input()
  public items: BreadcrumbItem[] = [];
}
