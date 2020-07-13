import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsDateTileComponent } from './versions-date-tile.component';

describe('VersionsDateTileComponent', () => {
  let component: VersionsDateTileComponent;
  let fixture: ComponentFixture<VersionsDateTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsDateTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsDateTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
