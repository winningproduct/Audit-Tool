import { QuestionDraft } from '@models/question-draft';

export interface IQuestionDraftService {
  getQuestionsByKnowledgeArea(
    knowledgeAreaId: number,
  ): Promise<QuestionDraft[]>;
}
