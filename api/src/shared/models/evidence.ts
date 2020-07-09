import { BaseEntity } from './baseEntity';

export class Evidence extends BaseEntity {
  productId!: number;
  questionId!: number;
  userId!: number;
  content!: string;
  status!: string;
  version!: string;
  createdDate!: Date;
}
