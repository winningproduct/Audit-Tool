import { BaseEntity } from './baseEntity';

export class KnowledgeArea extends BaseEntity {
  phaseId!: number;
  name!: string;
  description!: string;
  score!: number;
  url!: string;
}
