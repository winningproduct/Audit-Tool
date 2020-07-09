import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceBoxComponent } from './evidence-box.component';

describe('EvidenceBoxComponent', () => {
  let component: EvidenceBoxComponent;
  let fixture: ComponentFixture<EvidenceBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
