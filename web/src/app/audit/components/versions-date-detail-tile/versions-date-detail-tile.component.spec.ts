import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsDateDetailTileComponent } from './versions-date-detail-tile.component';

describe('VersionsDateDetailTileComponent', () => {
  let component: VersionsDateDetailTileComponent;
  let fixture: ComponentFixture<VersionsDateDetailTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsDateDetailTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsDateDetailTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
