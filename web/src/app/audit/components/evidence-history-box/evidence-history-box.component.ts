import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { Evidence } from '@shared/models/evidence';
import { EvidenceApiService } from '@shared/services/api/evidence.service';
import { DatePipe } from '@angular/common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-evidence-history-box',
  templateUrl: './evidence-history-box.component.html',
  styleUrls: ['./evidence-history-box.component.scss']
})
export class EvidenceHistoryBoxComponent implements OnInit {
  @Input() productId: number;
  @Input() questionId: number;
  evidenceId: number;
  evidence: Evidence[] = null;
  pipe = new DatePipe('en-US');
  submitEvidence = false;
  faSpinner = faSpinner;
  faArrowLeft = faArrowLeft;
  evidenceReceived = true;
  sub: any;
  param1: any;
  param2: any;
  param3: any;
  statusColor = '';
  modalRef: BsModalRef;

  constructor(
    private evidenceService: EvidenceApiService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,

  ) {
    this.evidenceService.evidenceId.subscribe(id => {
      this.spinner.show();
      this.evidenceId = id;
      if (this.evidenceId) {
        this.getEvidence(this.evidenceId);
      }
    });
  }

  async ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      this.param1 = +params['product-id'];
      this.param2 = +params['product-phase-id'];
      this.param3 = +params['knowledge-area-id'];
    });
    this.evidence = await this.evidenceService.get(this.productId , this.questionId);
    switch (this.evidence[0].status) {
      case 'Fully Complied' : {
        this.statusColor = 'success';
        break;
      }
      case 'Partialy Complied' : {
        this.statusColor = 'info';
        break;
      }
      case 'Not Complied' : {
        this.statusColor = 'warning';
        break;
      }
      case 'Not Applicable' : {
        this.statusColor = 'secondary';
        break;
      }
    }
  }

  revert(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  async save() {
    this.modalRef.hide();
    this.spinner.show();
    this.submitEvidence = true;
    try {
      this.evidenceService.revertEvidence(this.questionId, this.productId, this.evidence[0].id);
    } catch (error) {
    } finally {
      setTimeout(() => {
        this.submitEvidence = false;
      }, 1000);
      this.spinner.hide();
      this.navigate();
    }
  }

  decline(): void {
    this.modalRef.hide();
  }

  async getEvidence(id: number) {
    this.evidenceReceived = false;
    this.evidence = await this.evidenceService.getEvidenceById(id);
    this.evidenceReceived = true;
    this.spinner.hide();

  }

  navigate() {
    this.router.navigateByUrl(
      '/audit/products/' +
        this.param1 +
        '/phases/' +
        this.param2 +
        '/knowledge-areas/' +
        this.param3 +
        '/question',
    );
  }

}
