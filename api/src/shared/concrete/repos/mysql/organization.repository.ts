import { IOrganizationRepository } from '../../../abstract/repos/organization.repository.interface';
import { Organization } from '../../../models/organization';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { User } from '@models/user';
import { Domain as DomainEntity } from '../mysql/entity/domain';
import { mapDbItems, domainMapper, organizationMapper } from './dbMapper';
import { Organization as OrganizationEntity } from './entity/organization';

@injectable()
export class MySQLOrganizationRepository implements IOrganizationRepository {
  async getOrganizationIdFromDomain(_domain: string): Promise<User[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('domain')
        .from(DomainEntity, 'domain')
        .where('domain.domain = :domain', { domain: _domain })
        .getRawMany();
      return mapDbItems(result, domainMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getAllOrganizations(): Promise<Organization[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('organizations')
        .from(OrganizationEntity, 'organizations')
        .getRawMany();
      return mapDbItems(result, organizationMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): Organization {
    throw new Error('Method not implemented.');
  }
  add(_item: Organization) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: Organization) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
