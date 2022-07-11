import { TYPES } from 'shared/constants/Types';
import { IProductRepository } from '@repos/product.repository.interface';
import { IAdminService } from 'admin/interfaces/admin.service.interface';
import { injectable, inject } from 'inversify';
import { IUserRepository } from '@repos/user.repository.interface';
import { Product } from '@models/product';
import { IOrganizationRepository } from '@repos/organization.repository.interface';
import { Organization } from '@models/organization';

@injectable()
export class AdminService implements IAdminService {
  protected productRepository: IProductRepository;
  protected userRepository: IUserRepository;
  protected organizationRepository: IOrganizationRepository;

  constructor(
    @inject(TYPES.ProductRepository) _productRepository: IProductRepository,
    @inject(TYPES.UserRepository) _userRepository: IUserRepository,
    @inject(TYPES.OrganizationRepository)
    _organizationRepository: IOrganizationRepository,
  ) {
    this.productRepository = _productRepository;
    this.userRepository = _userRepository;
    this.organizationRepository = _organizationRepository;
  }

  async getAllProducts() {
    return await this.productRepository.getAllProducts();
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async getNoneProductUsers(productId: number) {
    return await this.userRepository.getNoneProductUsers(productId);
  }

  async getAllOrganizations() {
    return await this.organizationRepository.getAllOrganizations();
  }

  async addUserProduct(productId: number, userIds: []) {
    return await this.userRepository.assignProjectToUser(productId, userIds);
  }

  async addProduct(product: Product) {
    return await this.productRepository.add(product);
  }

  async addOrganization(organization: Organization) {
    return await this.organizationRepository.add(organization);
  }
}
