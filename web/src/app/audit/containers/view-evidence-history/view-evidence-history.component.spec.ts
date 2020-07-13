import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEvidenceHistoryComponent } from './view-evidence-history.component';

describe('ViewEvidenceHistoryComponent', () => {
  let component: ViewEvidenceHistoryComponent;
  let fixture: ComponentFixture<ViewEvidenceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEvidenceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEvidenceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
