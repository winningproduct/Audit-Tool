import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceHistoryBoxComponent } from './evidence-history-box.component';

describe('EvidenceHistoryBoxComponent', () => {
  let component: EvidenceHistoryBoxComponent;
  let fixture: ComponentFixture<EvidenceHistoryBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceHistoryBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceHistoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
