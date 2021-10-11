import { BaseEntity } from './baseEntity';

export class QuestionDraft extends BaseEntity {
  id!: number;
  orderId!: number;
  title!: string;
  description!: string;
  version!: string;
  knowledgeAreaId!: number;
  majorVersion!: number;
  minorVersion!: number;
  patchVersion!: number;
}
