import { IKnowledgeAreaRepository } from '@repos/knowledge-area.repository';
import { IKnowledgeAreaService } from '../interfaces/knowledge-area.service.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from 'shared/constants/Types';
@injectable()
export class KnowledgeAreaService implements IKnowledgeAreaService {
  protected knowledgeAreaRepository: IKnowledgeAreaRepository;
  constructor(
    @inject(TYPES.KnowledgeAreaRepository)
    _knowledgeAreaRepository: IKnowledgeAreaRepository,
  ) {
    this.knowledgeAreaRepository = _knowledgeAreaRepository;
  }

  async getKnowledgeAreaByPhase(phaseId: number) {
    return await this.knowledgeAreaRepository.getKnowledgeAreasByProductPhaseId(
      phaseId,
    );
  }

  async getKnowledgeAreaById(id: number) {
    return await this.knowledgeAreaRepository.getKnowledgeAreasById(id);
  }

  async getKnowledgeAreaScore(id: number) {
    return await this.knowledgeAreaRepository.getQuestionCount(id);
  }
}
