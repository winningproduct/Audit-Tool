import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeAreaApiService } from '@shared/services/api/knowledge-area.service';
import { KnowledgeArea } from '@shared/models/knowledge-area';
import { ProductApiService } from '@shared/services/api/product.api.service';
import { Product } from '@shared/models/product';
import { Question } from '@shared/models/question';
import { QuestionApiService } from '@shared/services/api/question.api.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PhaseApiService } from '@shared/services/api/phase.api.service';
import { Phase } from '@shared/models/phase';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss'],
})
export class ViewQuestionsComponent implements OnInit {
  phaseId: number;
  productId: number;
  phase: Phase;
  knowledgeAreaId: number;
  sub: any;
  lcarouselLength = 5;
  constructor(
    private route: ActivatedRoute,
    private knowledgeAreaApiService: KnowledgeAreaApiService,
    private productApiService: ProductApiService,
    private questionApiService: QuestionApiService,
    private phaseApiService: PhaseApiService,
    private spinner: NgxSpinnerService,

  ) {
  }

  items: KnowledgeArea[] = [];
  product: Product[];
  questions: Question[];
  knowledgeArea: KnowledgeArea[];
  faSpinner = faSpinner;
  name: string;
  url: string;
  QCount: any;
  ACount: number;
  score: number;
  length: number;
  loader = false;

  async ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      this.showSpinner();
      this.knowledgeAreaApiService.nextMessage(0);
      this.productId = +params['product-id'];
      this.phaseId = +params['product-phase-id'];
      this.knowledgeAreaId = +params['knowledge-area-id'];
      await this.getProductDetails(this.productId);
      await this.getPhaseDetailsByProductPhaseId(this.phaseId);
      await this.getKnowledgeAreasByPhaseId(this.phaseId);
      await this.getQuestionsByKnowledgeArea(this.knowledgeAreaId);
      await this.getKnowledgeAreaById(this.knowledgeAreaId);
      await this.getQuestionCount(this.knowledgeAreaId);
      this.knowledgeAreaApiService.sharedACount.subscribe(count => {
        this.ACount = count;
        if (this.QCount === 0 || this.ACount === 0) {
          this.score = 0;
        } else {
        this.score = (this.ACount / this.QCount) * 100;
        }
      });
      this.hideSpinner();
    });
  }

  async getKnowledgeAreasByPhaseId(id: number) {
    this.items = await this.knowledgeAreaApiService.get(id);
  }

  async getQuestionCount(id: number) {
    this.QCount = await this.knowledgeAreaApiService.getQuestionCount(id);
    this.QCount = this.QCount.length;
  }

  async getKnowledgeAreaById(id: number) {
    this.knowledgeArea = await this.knowledgeAreaApiService.getById(id);
  }

  async getProductDetails(id: number) {
    this.product = await this.productApiService.getById(id);
  }

  async getPhaseDetailsByProductPhaseId(id: number) {
    this.phase = await this.phaseApiService.getPhaseByProductPhaseId(id);
  }

  async getQuestionsByKnowledgeArea(id: number) {
    this.questions = await this.questionApiService.get(id);
    this.length = this.questions.length;
  }

  async showSpinner() {
    this.spinner.show();
  }

  async hideSpinner() {
    this.loader = true;
    this.spinner.hide();
  }

}
