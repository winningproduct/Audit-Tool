import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductApiService } from '@shared/services/api/product.api.service';
import { Product } from '@shared/models/product';
import { Question } from '@shared/models/question';
import { QuestionApiService } from '@shared/services/api/question.api.service';
import { KnowledgeAreaApiService } from '@shared/services/api/knowledge-area.service';
import { KnowledgeArea } from '@shared/models/knowledge-area';

@Component({
  selector: 'app-view-evidence-history',
  templateUrl: './view-evidence-history.component.html',
  styleUrls: ['./view-evidence-history.component.scss']
})
export class ViewEvidenceHistoryComponent implements OnInit {

  isCollapsed = false;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private productApiService: ProductApiService,
    private questionApiService: QuestionApiService,
    private knowledgeAreaApiService: KnowledgeAreaApiService,

    ) { }

  sub: any;
  productId: number;
  questionId: number;
  phaseId: number;
  knowledgeAreaId: number;
  product: Product[];
  question: Question[];
  knowledgeArea: KnowledgeArea[];
  loader = false;

  async ngOnInit() {
    this.showSpinner();
    this.sub = this.route.params.subscribe(async params => {
      this.productId = +params['product-id'];
      this.questionId = +params['question-id'];
      this.phaseId = +params['product-phase-id'];
      this.knowledgeAreaId = +params['knowledge-area-id'];
      this.product = await this.productApiService.getById(this.productId);
      this.hideSpinner();
    });
  }

  async showSpinner() {
    this.spinner.show();
  }

  async hideSpinner() {
    this.loader = true;
    this.spinner.hide();
  }
}
