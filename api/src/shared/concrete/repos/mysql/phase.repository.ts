import { Phase } from './../../../models/phase';
import { IPhaseRepository } from '../../../abstract/repos/phase.repository.interface';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { mapDbItems, phasesMapper, phaseScoreMapper } from './dbMapper';
import { ProductPhase } from './entity/product_phase';
import { KnowledgeArea as KnowledgeAreaEntity } from './entity/knowledge_area';
import { Evidence as EvidenceEntity } from './entity/evidence';

@injectable()
export class MYSQLPhaseRepository implements IPhaseRepository {
  async getPhases(productId: number): Promise<Phase[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductPhase)
        .createQueryBuilder('product_phase')
        .leftJoinAndSelect('product_phase.phase', 'phases')
        .where('product_phase.productId = :productId', { productId })
        .getRawMany();
      return mapDbItems(result, phasesMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getPhaseByProductPhaseId(productPhaseId: number): Promise<Phase[]> {
    let connection: any;
    let result: Phase;
    try {
      connection = await initMysql();
      result = await connection
        .getRepository(ProductPhase)
        .createQueryBuilder('product_phase')
        .leftJoinAndSelect('product_phase.phase', 'phases')
        .where('product_phase.id = :productPhaseId', { productPhaseId })
        .getRawMany();
      return mapDbItems(result, phasesMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getQuestionCount(productId: number, phaseId: number): Promise<any> {
    let connection: any;
    try {
      connection = await initMysql();

      const AnswerCount = await connection
        .getRepository(EvidenceEntity)
        .createQueryBuilder('evidence')
        .innerJoin('evidence.question', 'questions')
        .innerJoin('questions.knowledgeArea', 'knowledgeAreas')
        .select('questions.knowledgeArea')
        .addSelect('COUNT(*) AS AnswerCount')
        .where(
          'evidence.id IN (SELECT MAX(Evidence.id) FROM Evidence WHERE Evidence.productId = :productId group by Evidence.questionId)',
          { productId },
        )
        .andWhere('evidence.status != "null"')
        .groupBy('questions.knowledgeArea')
        .getRawMany();

      const QuestionCount = await connection
        .getRepository(KnowledgeAreaEntity)
        .createQueryBuilder('knowledgeArea')
        .innerJoin('knowledgeArea.phase', 'phases')
        .innerJoin('knowledgeArea.questions', 'questions')
        .select('knowledgeArea.id')
        .addSelect('COUNT(*) AS QuestionCount')
        .where('phases.id = :phaseId', { phaseId })
        .groupBy('knowledgeArea.id')
        .getRawMany();

      return phaseScoreMapper(AnswerCount, QuestionCount);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): Phase {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/phase').Phase) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: import('../../../models/phase').Phase) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
