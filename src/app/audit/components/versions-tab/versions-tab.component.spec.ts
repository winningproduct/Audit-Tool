import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsTabComponent } from './versions-tab.component';

describe('VersionsTabComponent', () => {
  let component: VersionsTabComponent;
  let fixture: ComponentFixture<VersionsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
