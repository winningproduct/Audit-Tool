import { BaseEntity } from './baseEntity';

export class Organization extends BaseEntity {
  name!: string;
  email!: string;
  createdDate!: Date;
  phoneNumber!: string;
}
