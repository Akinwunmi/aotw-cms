import { NgClass, NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  HostListener,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { FlagIconComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';
import { filter, startWith } from 'rxjs';

import { DefaultEntity, DiscoverSection, Entity, EntityType, RouteDiscover } from '../../models';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [FlagIconComponent, NgClass, NgTemplateOutlet, TranslateModule, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover-header.component.html',
  styleUrl: './discover-header.component.scss'
})
export class DiscoverHeaderComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public activeEntityId = input<string>();
  public entities = input<Entity[]>();

  public activeEntity = output<string>();

  public continents = computed(() => this.entities()?.filter(entity =>
    entity.type === EntityType.Continent,
  ));
  
  public organizations = computed(() => this.entities()?.filter(entity =>
    entity.type === EntityType.Organization,
  ));

  public discoverSectionEnum = DiscoverSection;

  public activeSection = DiscoverSection.Continents;
  public isMobile = window.innerWidth < 640;

  public ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(this.router.url),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      const entityId = this.router.url.slice(1).split('/')[RouteDiscover.Entity];
      const section = entityId.startsWith('o')
        ? DiscoverSection.Organizations
        : DiscoverSection.Continents;
      this.activeSection = section;
    });
  }
  
  @HostListener('window:resize')
  public onWindowResize(): void {
    this.isMobile = window.innerWidth < 640;
  }

  public setActiveSection(section: DiscoverSection): void {
    const entityId = section === DiscoverSection.Continents
      ? DefaultEntity.Continents
      : DefaultEntity.Organizations;
    this.router.navigate(['discover', 'entity', entityId]);
    this.activeSection = section;
  }

  public setActiveEntity(id: string): void {
    this.activeEntity.emit(id);
  }
}
