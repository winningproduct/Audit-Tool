import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Phase } from './phase';
import { Question } from './question';

const ENTITY_NAME = 'KnowledgeArea';

@Entity(ENTITY_NAME)
export class KnowledgeArea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  score!: number;

  @Column()
  url!: string;

  @ManyToOne(
    type => Phase,
    phase => phase.knowledgeAreas,
  )
  phase!: Phase;

  @OneToMany(
    type => Question,
    question => question.knowledgeArea,
  )
  questions!: Question[];
}
