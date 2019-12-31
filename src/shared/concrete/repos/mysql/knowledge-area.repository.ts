import { IKnowledgeAreaRepository } from '../../../abstract/repos/knowledge-area.repository';
import { initMysql } from './connection.manager';
import { mapDbItems, knowledgeAreaMapper } from './dbMapper';
import { injectable } from 'inversify';

@injectable()
export class MySQLKnowledgeAreaRepository implements IKnowledgeAreaRepository {
  async getKnowledgeAreasByProductPhaseId(
    _productPhaseId: number,
  ): Promise<Array<import('../../../models/knowledge-area').KnowledgeArea>> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection.query(`CALL GetKnowledgeAreasByProductPhaseId(${_productPhaseId})`);
      return mapDbItems(result, knowledgeAreaMapper);
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
  update(_itemId: number, _item: import('../../../models/knowledge-area').KnowledgeArea) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
