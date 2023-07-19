import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AotwTabGroupComponent } from './tab-group.component';

describe('AotwTabGroupComponent', () => {
  let component: AotwTabGroupComponent;
  let fixture: ComponentFixture<AotwTabGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AotwTabGroupComponent]
    });
    fixture = TestBed.createComponent(AotwTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set active tab', () => {
    const selectedTabEmitSpy = spyOn(component.selectedTab, 'emit');

    fixture.detectChanges();
    component.tabs = [
      { id: 0, name: 'search', label: 'Search', disabled: false },
      { id: 1, name: 'discover', label: 'Discover', disabled: false }
    ];
    component.setActiveTab(component.tabs[1]);

    expect(component.activeTab).toEqual(component.tabs[1].id);
    expect(selectedTabEmitSpy).toHaveBeenCalled();
  });
});
