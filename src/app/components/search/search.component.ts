import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersComponent } from '../filters';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

}
