import { Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@aotw/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('class.create')
  @Input()
  public createMode = false;

  constructor(private router: Router) {}

  public goToHome(): void {
    this.router.navigate(['']);
  }
}
