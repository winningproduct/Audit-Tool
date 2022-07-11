import { Question } from '@models/question';

export interface IQuestionService {
  getQuestionsByKnowledgeArea(
    knowledgeAreaId: number,
    productId: number,
  ): Promise<Question[]>;
}
