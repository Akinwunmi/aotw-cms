import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  output,
} from '@angular/core';
import { FlagIconComponent } from '@flagarchive/angular';

import { DiscoverSection, Topic } from '../../models';
import { SHARED_IMPORTS } from '../../shared';

@Component({
  selector: 'app-discover-header',
  standalone: true,
  imports: [...SHARED_IMPORTS, FlagIconComponent, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discover-header.component.html',
  styleUrl: './discover-header.component.scss'
})
export class DiscoverHeaderComponent {
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
  
  @HostListener('window:resize')
  public onWindowResize(): void {
    this.isMobile = window.innerWidth < 640;
  }

  public setActiveSection(section: DiscoverSection): void {
    this.activeSection = section;
  }

  public setActiveTopic(id: string): void {
    this.activeTopic.emit(id);
  }
}
