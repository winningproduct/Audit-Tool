import { IKnowledgeAreaRepository } from '../../../abstract/repos/knowledge-area.repository';
import { initMysql } from './connection.manager';
import { mapDbItems, knowledgeAreaMapper } from './dbMapper';
import { KnowledgeArea } from '../../../models/knowledge-area';
import { KnowledgeArea as KnowledgeAreaEntity } from './entity/knowledge_area';
import { injectable } from 'inversify';
import { Phase as PhaseEntity } from './entity/phase';

@injectable()
export class MySQLKnowledgeAreaRepository implements IKnowledgeAreaRepository {
  async getKnowledgeAreasByProductPhaseId(
    _productPhaseId: number,
  ): Promise<KnowledgeArea[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(PhaseEntity)
        .createQueryBuilder('phase')
        .leftJoinAndSelect('phase.productPhases', 'productPhase')
        .leftJoinAndSelect('phase.knowledgeAreas', 'knowledgeArea')
        .where('productPhase.id = :Id', { Id: _productPhaseId })
        .getRawMany();
      return mapDbItems(result, knowledgeAreaMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getKnowledgeAreasById(_id: number): Promise<KnowledgeArea[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('knowledgeArea')
        .from(KnowledgeAreaEntity, 'knowledgeArea')
        .where('knowledgeArea.id= :_id', { _id })
        .getRawMany();
      return mapDbItems(result, knowledgeAreaMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  // Knowledge Area Score
  async getQuestionCount(_id: number): Promise<any> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(KnowledgeAreaEntity)
        .createQueryBuilder('knowledgeArea')
        .innerJoin('knowledgeArea.questions', 'question')
        .select('question')
        .where('knowledgeArea.id = :Id', { Id: _id })
        .getRawMany();
      return result;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): import('../../../models/knowledge-area').KnowledgeArea {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/knowledge-area').KnowledgeArea) {
    throw new Error('Method not implemented.');
  }
  update(
    _itemId: number,
    _item: import('../../../models/knowledge-area').KnowledgeArea,
  ) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
