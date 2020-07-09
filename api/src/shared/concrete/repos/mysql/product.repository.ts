import { Product } from './../../../models/product';
import { IProductRepository } from '../../../abstract/repos/product.repository.interface';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { ProductPhase } from './entity/product_phase';
import { Product as ProductEntity } from './entity/product';
import { Phase as PhaseEntity } from './entity/phase';
import { User as UserEntity } from './entity/user';
import { mapDbItems, productMapper, productScoreMapper } from './dbMapper';
import { getRepository } from 'typeorm';
import { Question as QuestionEntity } from './entity/question';
import { Evidence as EvidenceEntity } from './entity/evidence';
import { Organization as OrganizationEntity } from './entity/organization';

@injectable()
export class MySQLProductRepository implements IProductRepository {
  // return the product of a product_phase_id
  async getProductByProductPhaseId(productPhaseId: number): Promise<Product[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductPhase)
        .createQueryBuilder('product_phase')
        .innerJoinAndSelect('product_phase.product', 'products')
        .select('products')
        .where('product_phase.Id = :productPhaseId', { productPhaseId })
        .getRawMany();
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  // get product by user id
  async getProductsByUser(userId: number): Promise<Product[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductEntity)
        .createQueryBuilder('products')
        .leftJoinAndSelect('products.users', 'user')
        .where('user.id = :userId', { userId })
        .getRawMany();
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getProductById(productId: number): Promise<Product> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductEntity)
        .createQueryBuilder('products')
        .where('products.id = :productId', { productId })
        .getRawMany();
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async add(_req: any): Promise<boolean> {
    let connection: any;
    try {
      connection = await initMysql();
      const phaseRepository = getRepository(PhaseEntity);
      const phases = await phaseRepository.find();
      const questionRepository = getRepository(QuestionEntity);
      const questions = await questionRepository.find();
      const userRepository = getRepository(UserEntity);
      const user = await userRepository.findOneOrFail(_req.product.userId);

      const organizationRepository = getRepository(OrganizationEntity);
      const organization = await organizationRepository.findOneOrFail(
        _req.product.organizationId,
      );

      const product = new ProductEntity();
      product.name = _req.product.name;
      product.description = _req.product.description;
      product.user = user;
      product.organization = organization;
      const result = await connection.manager.save(product);

      // Creates Product Phases
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < phases.length; index++) {
        const productPhase = new ProductPhase();
        productPhase.phaseId = phases[index].id;
        productPhase.score = 0;
        productPhase.productId = result.id;
        await connection.manager.save(productPhase);
      }
      // Creates New Evidence set
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < questions.length; index++) {
        const evidence = new EvidenceEntity();
        evidence.content = '';
        evidence.status = 'null';
        evidence.question = questions[index];
        evidence.product = product;
        evidence.user = user;
        evidence.version = '1'; // Need to be changed when Question Versoning is Finalized
        await connection.manager.save(evidence);
      }

      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getAllProducts(): Promise<Product[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductEntity)
        .createQueryBuilder('products')
        .getRawMany();
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getQuestionCount(productId: number): Promise<any> {
    let connection: any;
    try {
      connection = await initMysql();

      const AnswerCount = await connection
        .getRepository(EvidenceEntity)
        .createQueryBuilder('evidence')
        .select('COUNT(*) AS AnswerCount')
        .where(
          'evidence.id IN (SELECT MAX(Evidence.id) FROM Evidence WHERE Evidence.productId = :productId group by Evidence.questionId)',
          { productId },
        )
        .andWhere('evidence.status != "null"')
        .getRawMany();

      const QuestionCount = await connection
        .getRepository(QuestionEntity)
        .createQueryBuilder('questions')
        .select('COUNT(*) AS QuestionCount')
        .getRawMany();

      return productScoreMapper(AnswerCount, QuestionCount);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): Product {
    throw new Error('Method not implemented.');
  }

  update(_itemId: number, _item: import('../../../models/product').Product) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
