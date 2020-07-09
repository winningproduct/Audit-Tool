import { IEvidenceRepository } from '../../../abstract/repos/evidence.repository';
import { initMysql } from './connection.manager';
import { mapDbItems, evidenceMapper } from './dbMapper';
import { Evidence } from '@models/evidence';
import { Evidence as EvidenceEntity } from './entity/evidence';
import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { User } from './entity/user';
import { Product } from './entity/product';
import { Question } from './entity/question';

@injectable()
export class MySQLEvidenceRepository implements IEvidenceRepository {
  async getEvidenceByProjectIdAndQuestionId(
    _productId: number,
    _questionId: number,
  ): Promise<Evidence[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('evidence')
        .from(EvidenceEntity, 'evidence')
        .where('evidence.productId = :productId', { productId: _productId })
        .andWhere('evidence.questionId = :questionId', {
          questionId: _questionId,
        })
        .orderBy('evidence.id', 'DESC')
        .getRawMany();
      return mapDbItems(result, evidenceMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async addEvidenceByQuestionId(
    _questionId: number,
    _evidence: Evidence,
  ): Promise<boolean> {
    let connection: any;
    try {
      connection = await initMysql();
      const evidence = new EvidenceEntity();
      evidence.content = _evidence.content;
      evidence.status = _evidence.status;
      evidence.version = _evidence.version;
      const productRepository = getRepository(Product);
      const product = await productRepository.findOneOrFail(
        _evidence.productId,
      );
      evidence.product = product;
      const questionRepository = getRepository(Question);
      const question = await questionRepository.findOneOrFail(_questionId);
      evidence.question = question;
      const userRepository = getRepository(User);
      const user = await userRepository.findOneOrFail(_evidence.userId);
      evidence.user = user;
      await connection.manager.save(evidence);
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async updateStatus(_evidenceId: number, _status: string): Promise<boolean> {
    let connection: any;
    try {
      connection = await initMysql();
      await connection
        .createQueryBuilder()
        .update(Evidence)
        .set({
          status: _status,
        })
        .where('Id = :id', { id: _evidenceId })
        .execute();
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getVersionsGroupByDate(
    productId: number,
    questionId: number,
    pageId: number,
  ): Promise<Evidence[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(EvidenceEntity)
        .createQueryBuilder('evidence')
        .select(
          'DISTINCT DATE_FORMAT(evidence.createdDate, "%Y-%m-%d") as evidence_createdDate',
        )
        .where('evidence.productId = :productId', { productId })
        .andWhere('evidence.questionId = :questionId', { questionId })
        .skip(pageId)
        .take(20)
        .orderBy('evidence_createdDate', 'DESC')
        .getRawMany();
      return mapDbItems(result, evidenceMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getEvidenceById(_evidenceId: number): Promise<Evidence[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('evidence')
        .from(EvidenceEntity, 'evidence')
        .where('evidence.id = :id', { id: _evidenceId })
        .getRawMany();
      return mapDbItems(result, evidenceMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getVersionsByDate(
    productId: number,
    questionId: number,
    date: string,
  ): Promise<Evidence[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(EvidenceEntity)
        .createQueryBuilder('evidence')
        .innerJoin('evidence.user', 'users')
        .select('users.firstName')
        .addSelect('users.lastName')
        .addSelect('evidence.createdDate')
        .addSelect('evidence.id')
        .where('DATE_FORMAT(evidence.createdDate, "%Y-%m-%d") = :date', {
          date,
        })
        .andWhere('evidence.productId = :productId', { productId })
        .andWhere('evidence.questionId = :questionId', { questionId })
        .getRawMany();
      return mapDbItems(result, evidenceMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async revertEvidence(
    _productId: number,
    _questionId: number,
    evidenceId: number,
  ): Promise<boolean> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('evidence')
        .from(EvidenceEntity, 'evidence')
        .where('evidence.productId = :productId', { productId: _productId })
        .andWhere('evidence.questionId = :questionId', {
          questionId: _questionId,
        })
        .orderBy('evidence.id', 'DESC')
        .getRawOne();

      const evidence = await connection
        .createQueryBuilder()
        .select('evidence')
        .from(EvidenceEntity, 'evidence')
        .where('evidence.id = :id', { id: evidenceId })
        .getRawMany();
      const revertedEvidence = new EvidenceEntity();
      revertedEvidence.content = evidence[0].evidence_content;
      revertedEvidence.status = result.evidence_status;
      revertedEvidence.version = evidence[0].evidence_version;

      const productRepository = getRepository(Product);
      const product = await productRepository.findOneOrFail(
        evidence[0].evidence_productId,
      );
      revertedEvidence.product = product;
      const questionRepository = getRepository(Question);
      const question = await questionRepository.findOneOrFail(
        evidence[0].evidence_questionId,
      );
      revertedEvidence.question = question;
      const userRepository = getRepository(User);
      const user = await userRepository.findOneOrFail(
        evidence[0].evidence_userId,
      );
      revertedEvidence.user = user;

      await connection.manager.save(revertedEvidence);
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): Evidence {
    throw new Error('Method not implemented.');
  }
  add(_item: Evidence) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: Evidence) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
