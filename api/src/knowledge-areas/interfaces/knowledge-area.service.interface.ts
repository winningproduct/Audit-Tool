import { KnowledgeArea } from '@models/knowledge-area';

export interface IKnowledgeAreaService {
  getKnowledgeAreaByPhase(phaseId: number): Promise<KnowledgeArea[]>;
  getKnowledgeAreaById(id: number): Promise<KnowledgeArea[]>;
  getKnowledgeAreaScore(id: number): Promise<any>;
}
