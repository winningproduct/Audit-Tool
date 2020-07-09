import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhasesComponent } from './view-phases.component';

describe('ViewPhasesComponent', () => {
  let component: ViewPhasesComponent;
  let fixture: ComponentFixture<ViewPhasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
