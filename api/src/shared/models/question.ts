import { BaseEntity } from './baseEntity';

export class Question extends BaseEntity {
  knowledgeAreaId!: number;
  revisionId!: number;
  userId!: number;
  title!: string;
  description!: string;
  version!: string;
  createdDate!: string;
}
