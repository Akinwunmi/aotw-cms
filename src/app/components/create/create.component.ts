import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AotwFieldComponent, AotwLabelComponent } from '../lib';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, AotwFieldComponent, AotwLabelComponent],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {}
