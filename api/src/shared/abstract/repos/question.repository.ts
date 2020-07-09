import { IRepository } from './repository.interface';
import { Question } from '../../models/question';

export interface IQuestionRepository extends IRepository<Question> {
  getQuestionsByKnowledgeAreaId(knowledgeAreaId: number): Promise<Question[]>;
}
