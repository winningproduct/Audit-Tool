import { QuestionDraft } from '@models/question-draft';

export interface IQuestionDraftService {
  getQuestionsByKnowledgeArea(
    knowledgeAreaId: number,
    productId: number,
  ): Promise<QuestionDraft[]>;
}
