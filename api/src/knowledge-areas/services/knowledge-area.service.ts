import { IKnowledgeAreaRepository } from '@repos/knowledge-area.repository';
import { IQuestionDraftRepository } from '@repos/question-draft.repository';
import { IKnowledgeAreaService } from '../interfaces/knowledge-area.service.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from 'shared/constants/Types';
import { Question } from '@models/question';

@injectable()
export class KnowledgeAreaService implements IKnowledgeAreaService {
  protected knowledgeAreaRepository: IKnowledgeAreaRepository;
  protected questionDraftRepository: IQuestionDraftRepository;

  constructor(
    @inject(TYPES.KnowledgeAreaRepository) _knowledgeAreaRepository: IKnowledgeAreaRepository,
    @inject(TYPES.QuestionDraftRepository) _questionDraftRepository: IQuestionDraftRepository,
  ) {
    this.knowledgeAreaRepository = _knowledgeAreaRepository;
    this.questionDraftRepository = _questionDraftRepository;
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
    return await this.questionDraftRepository.getQuestionsByKnowledgeAreaId(id);
  }

}
