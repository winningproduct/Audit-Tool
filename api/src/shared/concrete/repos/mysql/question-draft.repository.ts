import { initMysql } from './connection.manager';
import { IQuestionDraftRepository } from '../../../abstract/repos/question-draft.repository';
import { injectable } from 'inversify';
import { Question as QuestionDraftEntity } from './entity/question';
import{ Evidence as EvidenceEntity } from './entity/evidence';
import { mapDbItems, questionMapper, questionDraftMapper, evidenceMapper } from './dbMapper';
import { Evidence } from '@models/evidence';
@injectable()
export class MySQLQuestionDraftRepository implements IQuestionDraftRepository {
  async getQuestionsByKnowledgeAreaId(
    knowledgeAreaId: number,
    productId: number
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
        .addOrderBy('question.minorVersion', 'DESC')
        .addOrderBy('question.patchVersion', 'DESC')
        .getRawMany();

      const mappedItems = mapDbItems(result, questionDraftMapper);
      
      let orderIds:any[] = [];
      let questionIds:any[] = [];
      let evidencequestionIds = new Set();
      const latestItems = [];
      let latestitem;
      let ver: string;
      

      for (const item in mappedItems){
        orderIds.push(mappedItems[item].orderId);
      }

      for (const item in mappedItems){
        questionIds.push(mappedItems[item].id);
      }
      

      const evidence = await connection
        .getRepository(EvidenceEntity)
        .createQueryBuilder('evidence')
        .where('evidence.questionId IN (:questionIds)', {questionIds})
        .andWhere('evidence.status != "null"')
        .andWhere('evidence.productId = :productId', {productId})
        .getRawMany();

      
      
      for (const item in evidence){
          evidencequestionIds.add(evidence[item].evidence_questionId);
      }
      
      
      orderIds = [...new Set(orderIds)];
      
      for (const key in orderIds){
        const sameOrderId = mappedItems.filter(item => {
          return item.orderId == orderIds[key];
        });

        ver = sameOrderId[0].version;
        latestitem = sameOrderId[0];
        

        for(const sameorder in sameOrderId){
          if(evidencequestionIds.has(sameOrderId[sameorder].id)){
            latestitem = sameOrderId[sameorder];
            break;
          }
        }
        latestItems.push(latestitem);
      }
      
      return latestItems;
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
