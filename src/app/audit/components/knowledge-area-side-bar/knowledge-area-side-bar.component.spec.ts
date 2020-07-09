import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeAreaSideBarComponent } from './knowledge-area-side-bar.component';

describe('KnowledgeAreaSideBarComponent', () => {
  let component: KnowledgeAreaSideBarComponent;
  let fixture: ComponentFixture<KnowledgeAreaSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeAreaSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeAreaSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
