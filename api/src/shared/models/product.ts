import { BaseEntity } from './baseEntity';

export class Product extends BaseEntity {
  name!: string;
  createdDate!: string;
  description!: string;
  userId!: number;
  users!: [];
  organizationId!: number;
}
