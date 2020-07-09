import { Component, OnInit, Input } from '@angular/core';
import { Phase } from '@shared/models/phase';
import { Product } from '@shared/models/product';
import { KnowledgeAreaApiService } from '@shared/services/api/knowledge-area.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhaseApiService } from '@shared/services/api/phase.api.service';

@Component({
  selector: 'app-phase-tile',
  templateUrl: './phase-tile.component.html',
  styleUrls: ['./phase-tile.component.scss'],
})
export class PhaseTileComponent implements OnInit {
  @Input() phase: Phase;
  @Input() productId: number;
  knowledgeA: any;
  score: any = 0;
  answerCount: number;
  questionCount: number;
  result: any;
  constructor(
    private knowledgeAreaApiService: KnowledgeAreaApiService,
    private phaseApiService: PhaseApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  async ngOnInit() {
    await this.getProgress();
    this.knowledgeA = await this.knowledgeAreaApiService.get(
      this.phase.phaseId,
    );
  }

  navigate() {
    this.router.navigateByUrl(
      '/audit/products/' +
        this.productId +
        '/phases/' +
        this.phase.productPhaseId +
        '/knowledge-areas/' +
        this.knowledgeA[0].id +
        '/question',
    );
  }

  async getProgress() {
    this.result = await this.phaseApiService.getQuestionCount(this.productId, this.phase.id);
    this.answerCount = 0;
    this.questionCount = 0;
    this.result.forEach(element => {
      this.answerCount = this.answerCount + element.answerCount;
      this.questionCount = this.questionCount + element.questionCount;
    });
    if (this.questionCount === 0) {
      this.score = 0;
    } else {
    this.score = (this.answerCount / this.questionCount) * 100;
    }
  }
}
