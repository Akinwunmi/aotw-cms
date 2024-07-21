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

import { DefaultTopic, DiscoverSection, RouteDiscover, Topic } from '../../models';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [FlagIconComponent, NgClass, NgTemplateOutlet, TranslateModule, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover-header.component.html',
  styleUrl: './discover-header.component.scss'
})
export class DiscoverHeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  public activeTopicId = input<string>();
  public topics = input<Topic[]>();

  public activeTopic = output<string>();

  public continents = computed(() => this.topics()?.filter(topic =>
    topic.type === 'Continent',
  ));
  
  public organizations = computed(() => this.topics()?.filter(topic =>
    topic.type === 'Organization',
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
      const topicId = this.router.url.slice(1).split('/')[RouteDiscover.Topic];
      const section = topicId.startsWith('o')
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
    const topicId = section === DiscoverSection.Continents
      ? DefaultTopic.Continents
      : DefaultTopic.Organizations;
    this.router.navigate(['discover', 'topic', topicId]);
    this.activeSection = section;
  }

  public setActiveTopic(id: string): void {
    this.activeTopic.emit(id);
  }
}
