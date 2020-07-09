import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsDateGroupTileComponent } from './versions-date-group-tile.component';

describe('VersionsDateGroupTileComponent', () => {
  let component: VersionsDateGroupTileComponent;
  let fixture: ComponentFixture<VersionsDateGroupTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsDateGroupTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsDateGroupTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
