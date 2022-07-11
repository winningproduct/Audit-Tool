import { TYPES } from 'shared/constants/Types';
import { IQuestionDraftRepository } from '@repos/question-draft.repository';
import { IQuestionDraftService } from 'questions/interfaces/question-draft.service.interface';
import { injectable, inject } from 'inversify';

@injectable()
export class QuestionDraftService implements IQuestionDraftService {
  protected questionRepository: IQuestionDraftRepository;

  constructor(
    @inject(TYPES.QuestionDraftRepository)
    _questionRepository: IQuestionDraftRepository,
  ) {
    this.questionRepository = _questionRepository;
  }

  async getQuestionsByKnowledgeArea(
    knowledgeAreaId: number,
    productId: number,
  ) {
    return await this.questionRepository.getQuestionsByKnowledgeAreaId(
      knowledgeAreaId,
      productId,
    );
  }
}
