import { initMysql } from './connection.manager';
import { IQuestionDraftRepository } from '../../../abstract/repos/question-draft.repository';
import { injectable } from 'inversify';
import { QuestionDraft as QuestionDraftEntity } from './entity/question_draft';
import { mapDbItems, questionMapper } from './dbMapper';
@injectable()
export class MySQLQuestionDraftRepository implements IQuestionDraftRepository {
  
  async getQuestionsByKnowledgeAreaId(
    knowledgeAreaId: number,
  ): Promise<Array<import('../../../models/question-draft').QuestionDraft>> {
    
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(QuestionDraftEntity)
        .createQueryBuilder('question')
        .where('question.knowledgeAreaId = :knowledgeAreaId', {
          knowledgeAreaId,
        })
        .orderBy('question.majorVersion', 'DESC')
        .take(1)
        .getRawMany();
      return mapDbItems(result, questionMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }
  get(_itemId: number): import('../../../models/question-draft').QuestionDraft {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/question-draft').QuestionDraft) {
    throw new Error('Method not implemented.');
  }
  update(
    _itemId: number,
    _item: import('../../../models/question-draft').QuestionDraft,
  ) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
