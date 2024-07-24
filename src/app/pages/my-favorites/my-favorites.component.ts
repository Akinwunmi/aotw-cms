import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map, switchMap } from 'rxjs';

import { EntityComponent } from '../../components/entity';
import { FavoriteButtonComponent } from '../../components/favorite-button';
import { PageHeaderComponent } from '../../components/page-header';
import { EntityService, UserService } from '../../services';

@Component({
  selector: 'app-my-favorites',
  standalone: true,
  imports: [
    AsyncPipe,
    EntityComponent,
    FavoriteButtonComponent,
    PageHeaderComponent,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFavoritesComponent {
  private readonly entityService = inject(EntityService);
  private readonly userService = inject(UserService);

  private favorites$ = this.userService.getUser().pipe(
    map(user => user.favorites)
  );

  public favoriteEntities$ = this.favorites$.pipe(
    switchMap(favorites => this.entityService.getEntities().pipe(
      map(entities => ({ entities, favorites }))
    )),
    map(({ entities, favorites }) => (
      entities.filter(entity => favorites?.includes(entity.id)) ?? []
    ))
  );
}
