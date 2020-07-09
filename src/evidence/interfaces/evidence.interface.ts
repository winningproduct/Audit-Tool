import { Evidence } from '@models/evidence';

export interface IEvidenceService {
  getEvidenceByProjectIdAndQuestionId(
    projectId: number,
    questionId: number,
  ): Promise<Evidence[]>;

  addEvidenceByQuestionId(
    _questionId: number,
    _evidence: Evidence,
  ): Promise<boolean>;

  updateStatus(_evidenceId: number, _status: string): Promise<boolean>;

  getVersionsGroupByDate(
    _productId: number,
    _questionId: number,
    _pageId: number,
  ): Promise<Evidence[]>;

  getEvidenceById(_evidenceId: number): Promise<Evidence[]>;
  getVersionsByDate(
    _productId: number,
    _questionId: number,
    date: string,
  ): Promise<Evidence[]>;

  revertEvidence(
    _productId: number,
    _questionId: number,
    _evidenceId: number,
  ): Promise<boolean>;
}
