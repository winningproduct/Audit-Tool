import { IRepository } from './repository.interface';
import { Organization } from '../../models/organization';
import { User } from '@models/user';

export interface IOrganizationRepository extends IRepository<Organization> {
  getOrganizationIdFromDomain(domain: string): Promise<User[]>;
  getAllOrganizations(): Promise<Organization[]>;
}
