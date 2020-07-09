import { TYPES } from 'shared/constants/Types';
import { IProductRepository } from '@repos/product.repository.interface';
import { IPhaseRepository } from '@repos/phase.repository.interface';
import { IProductService } from 'products/interfaces/product.service.interface';
import { injectable, inject } from 'inversify';
import { Product } from '@models/product';

@injectable()
export class ProductService implements IProductService {
  protected productRepository: IProductRepository;
  protected phaseRepository: IPhaseRepository;

  constructor(
    @inject(TYPES.ProductRepository) _productRepository: IProductRepository,
    @inject(TYPES.PhaseRepository) _phaseRepository: IPhaseRepository,
  ) {
    this.productRepository = _productRepository;
    this.phaseRepository = _phaseRepository;
  }
  async getProductsByUser(userId: number) {
    return await this.productRepository.getProductsByUser(userId);
  }

  async getProductByProductPhaseId(productPhaseId: number) {
    return await this.productRepository.getProductByProductPhaseId(
      productPhaseId,
    );
  }

  async getPhases(productId: number) {
    return await this.phaseRepository.getPhases(productId);
  }

  async getProductById(productId: number) {
    return await this.productRepository.getProductById(productId);
  }

  async getPhaseByProductPhaseId(productId: number) {
    return await this.phaseRepository.getPhaseByProductPhaseId(productId);
  }

  async getPhaseScore(productId: number, phaseId: number) {
    return await this.phaseRepository.getQuestionCount(productId, phaseId);
  }

  async getProductScore(productId: number) {
    return await this.productRepository.getQuestionCount(productId);
  }
}
