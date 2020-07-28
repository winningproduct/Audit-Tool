import { Product } from '@models/product';
import { User } from '@models/user';
import { Organization } from '@models/organization';

export interface IAdminService {
  getAllProducts(): Promise<Product[]>;
  getAllUsers(): Promise<User[]>;
  addUserProduct(productId: number, userIds: []): Promise<boolean>;
  addProduct(product: Product): Promise<boolean>;
  addOrganization(organization: Organization): Promise<boolean>;
  getAllOrganizations(): Promise<Organization[]>;
}
