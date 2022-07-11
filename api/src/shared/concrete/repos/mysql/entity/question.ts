import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { KnowledgeArea } from './knowledge_area';
import { Evidence } from './evidence';

const ENTITY_NAME = 'Question_Draft';

@Entity(ENTITY_NAME)
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  version!: string;

  @ManyToOne(
    type => KnowledgeArea,
    knowledgeArea => knowledgeArea.questions,
  )
  knowledgeArea!: KnowledgeArea;

  @Column()
  majorVersion!: number;

  @Column()
  minorVersion!: number;

  @Column()
  patchVersion!: number;

  @OneToMany(
    type => Evidence,
    evidence => evidence.question,
  )
  evidences!: Evidence[];
}
