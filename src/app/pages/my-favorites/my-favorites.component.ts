import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map, switchMap } from 'rxjs';

import { FavoriteButtonComponent } from '../../components/favorite-button';
import { TopicComponent } from '../../components/topic';
import { TopicWithRange } from '../../models';
import { ArchiveService, UserService } from '../../services';

@Component({
  selector: 'app-my-favorites',
  standalone: true,
  imports: [
    AsyncPipe,
    FavoriteButtonComponent,
    RouterLink,
    TopicComponent,
    TranslateModule
  ],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFavoritesComponent {
  private archiveService = inject(ArchiveService);
  private userService = inject(UserService);

  private favorites$ = this.userService.getUser().pipe(
    map(user => user.favorites)
  );

  public favoriteTopics$ = this.favorites$.pipe(
    switchMap(favorites => this.archiveService.getArchive().pipe(
      map(archive => ({ topics: archive.topics, favorites }))
    )),
    map(({ topics, favorites }) => (
      topics.filter(topic => favorites?.includes(topic.id)) ?? []
    ) as TopicWithRange[])
  );
}
