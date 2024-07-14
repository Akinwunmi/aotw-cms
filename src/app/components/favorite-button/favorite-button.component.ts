import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import { FlagButtonDirective, FlagIconComponent } from '@flagarchive/angular';

import { UserService } from '../../services';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [FlagButtonDirective, FlagIconComponent],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
  private userService = inject(UserService);

  public id = input.required<string>();

  public active = computed(() => this.userService.favorites().includes(this.id()));

  public add(): void {
    this.userService.addFavorite(this.id()).subscribe();
  }

  public remove(): void {
    this.userService.removeFavorite(this.id()).subscribe();
  }
}
