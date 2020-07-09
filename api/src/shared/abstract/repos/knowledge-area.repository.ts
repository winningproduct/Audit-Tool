import { IRepository } from './repository.interface';
import { KnowledgeArea } from '../../models/knowledge-area';

export interface IKnowledgeAreaRepository extends IRepository<KnowledgeArea> {
  getKnowledgeAreasByProductPhaseId(
    productPhaseId: number,
  ): Promise<KnowledgeArea[]>;
  getKnowledgeAreasById(_id: number): Promise<KnowledgeArea[]>;
  getQuestionCount(_id: number): Promise<any>;
}
