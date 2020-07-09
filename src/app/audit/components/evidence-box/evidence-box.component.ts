import { Component, OnInit, Input } from '@angular/core';
import { Question } from '@shared/models/question';
import { Evidence } from '@shared/models/evidence';
import { ActivatedRoute, Router } from '@angular/router';
import { EvidenceApiService } from '@shared/services/api/evidence.service';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import MediumEditor from 'medium-editor';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@shared/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { KnowledgeAreaApiService } from '@shared/services/api/knowledge-area.service';

const BUTTONS = [
  'bold',
  'italic',
  'underline',
  'subscript',
  'superscript',
  'anchor',
  'quote',
  'orderedlist',
  'unorderedlist',
  'justifyFull',
  'h1',
];
@Component({
  selector: 'app-evidence-box',
  templateUrl: './evidence-box.component.html',
  styleUrls: ['./evidence-box.component.scss'],
})
export class EvidenceBoxComponent implements OnInit, AfterViewInit {

  faSpinner = faSpinner;
  faSave = faSave;
  faEllipsisV = faEllipsisV;

  @Input() question: Question;
  @Input() phaseId: number;
  @Input() knowledgeAreaId: number;
  @Input() index: number;
  @ViewChild('editable', {
    static: true,
  })
  editable: ElementRef;
  editor: any;
  evidence: Evidence[];
  productId: number;
  hideSaveButton = true;
  selectedStatus = null;
  isStatusUpdated = false;
  submitEvidence = false;
  statusColor = '';
  content: '';
  ACount: number;

  statusColorValues = [
    { id: 0 , value: ''},
    { id: 1, value: 'input-teal'},
    { id: 2, value: 'input-blue'},
    { id: 3, value: 'input-warning'},
    { id: 4, value: 'input-grey'},
  ];

  statusDropDowns = [
    { id: 1, value: 'Fully Complied' },
    { id: 2, value: 'Partialy Complied' },
    { id: 3, value: 'Not Complied' },
    { id: 4, value: 'Not Applicable' },
  ];

  constructor(
    private route: ActivatedRoute,
    private evidenceService: EvidenceApiService,
    private userService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private knowledgeAreaApiService: KnowledgeAreaApiService,

  ) {
    this.knowledgeAreaApiService.sharedACount.subscribe(count => this.ACount = count);
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.spinner.show();
      this.productId = +params['product-id'];
    });
    await this.getEvidenceByQuestionId(this.productId, this.question.id);
  }

  async getEvidenceByQuestionId(id: number, qid: number) {
    try {
      this.evidence = await this.evidenceService.get(id, qid);
      if (this.evidence[0].status !== 'null') {
        this.ACount++;
        this.knowledgeAreaApiService.nextMessage(this.ACount);
      }
    } catch (error) {
      console.log(error);
    }
    this.selectedStatus =
      this.evidence.length > 0 &&
      (
        this.statusDropDowns.find(item => {
          return item.value.includes(this.evidence[0].status);
        }) || { id: null, value: '' }
      ).id;
    this.editor.setContent(this.evidence[0] ? this.evidence[0].content : '');
    this.statusColor = this.statusColorValues[this.selectedStatus ? this.selectedStatus : 4].value;
  }

  async postEvidenceByQuestionId(qid: number, status: number) {
    this.submitEvidence = true;
    this.hideSaveButton = false;
    const evidence = new Evidence();
    evidence.productId = this.productId;
    evidence.userId = await this.userService.getCurrentUserId();
    evidence.content = this.editor.getContent();
    evidence.version = '1';
    evidence.status = (this.statusDropDowns.find(i => i.id === status) || { id: null , value: 'null'} ).value;
    try {
      await this.evidenceService.post(qid, evidence);
      this.content = this.editor.getContent();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.hideSaveButton = true;
        this.submitEvidence = false;
      }, 1000);
    }
  }

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.editable.nativeElement, {
      paste: {
        /* This example includes the default options for paste,
           if nothing is passed this is what it used */
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir', 'name'],
        cleanTags: ['meta'],
        unwrapTags: [],
      },
      toolbar: {
        /* These are the default options for the toolbar,
             if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: BUTTONS,
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false,
      },
    });
  }

  async updateStatus(status: any) {
    this.isStatusUpdated = true;
    const id = this.evidence[0].id;
    this.statusColor = this.statusColorValues[status ? status.id : 4].value;
    try {
      if ( !status ) {
        return ;
      }
      await this.evidenceService.updateStatus(
        this.question.id,
        status.value,
        Number(id),
      );
    } catch (error) {
      console.log(error);
    } finally {
      this.isStatusUpdated = false;
    }
  }

  toggleButton() {
    this.content = this.editor.getContent();
    this.hideSaveButton = false;
  }

  cancelButton() {
    this.editor.setContent(this.content);
    this.hideSaveButton = true;
  }

  navigate() {
    this.router.navigateByUrl('/audit/products/'
    + this.productId
    + '/phases/'
    + this.phaseId
    + '/knowledge-areas/'
    + this.knowledgeAreaId
    + '/question/'
    + this.question.id
    + '/evidence/versions');
  }

}
