import { IRepository } from './repository.interface';
import { QuestionDraft } from '@models/question-draft';

export interface IQuestionDraftRepository extends IRepository<QuestionDraft> {
  getQuestionsByKnowledgeAreaId(
    knowledgeAreaId: number,
    productId: number,
  ): Promise<QuestionDraft[]>;
}
