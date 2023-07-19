import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AotwIconRegistry } from '@aotw/components';
import { Router } from '@angular/router';

import { icons } from '../../../../assets/icons';

import { DiscoverHeaderComponent } from './discover-header.component';

describe('DiscoverHeaderComponent', () => {
  let component: DiscoverHeaderComponent;
  let fixture: ComponentFixture<DiscoverHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverHeaderComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/archive/23flag01'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverHeaderComponent);
    component = fixture.componentInstance;

    AotwIconRegistry.register(icons);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should return correct image url', () => {
    fixture.detectChanges();

    const image = component.getImage('af/ago');
    expect(image).toEqual('assets/mock/images/23flag01/af/ago.svg');
  });

  it('should return empty image string if no id is provided', () => {
    fixture.detectChanges();

    const image = component.getImage();
    expect(image).toEqual('');
  });
});
