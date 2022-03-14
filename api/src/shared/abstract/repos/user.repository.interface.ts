import { IRepository } from './repository.interface';
import { User } from '@models/user';

export interface IUserRepository extends IRepository<User> {
  getOrganizationByUserEmail(email: string): Promise<User[]>;

  getUsersByProjectId(id: number): Promise<User[]>;

  assignProjectToUser(productId: number, userIds: []): Promise<boolean>;

  getAllUsers(): Promise<User[]>;
  
  getNoneProductUsers(prductId: Number): Promise<User[]>;
}
