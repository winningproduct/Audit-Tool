import { IRepository } from './repository.interface';
import { Evidence } from '@models/evidence';

export interface IEvidenceRepository extends IRepository<Evidence> {
  getEvidenceByProjectIdAndQuestionId(
    productId: number,
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
    productId: number,
    questionId: number,
    date: string,
  ): Promise<Evidence[]>;

  revertEvidence(
    productId: number,
    questionId: number,
    evidenceId: number,
  ): Promise<boolean>;
}
