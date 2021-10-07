import { BaseEntity } from './baseEntity';

export class QuestionDraft extends BaseEntity {
  id!: number;
  orderId!: number;
  questionDescription!: string;
  version!: string;
  knowledgeAreaId!: number;
  majorVersion!: number;
  minorVersion!: number;
  patchVersion!: number;
}
