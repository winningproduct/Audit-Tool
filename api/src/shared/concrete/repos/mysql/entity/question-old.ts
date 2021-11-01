import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { KnowledgeArea } from './knowledge_area';
import { Revision } from './revision';
import { User } from './user';
import { Evidence } from './evidence';

const ENTITY_NAME = 'Question';

@Entity(ENTITY_NAME)
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  version!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate!: Date;

  @ManyToOne(
    type => KnowledgeArea,
    knowledgeArea => knowledgeArea.questions,
  )
  knowledgeArea!: KnowledgeArea;

  @ManyToOne(
    type => Revision,
    revision => revision.questions,
  )
  revision!: Revision;

  @ManyToOne(
    type => User,
    user => user.questions,
  )
  user!: User;

  @OneToMany(
    type => Evidence,
    evidence => evidence.question,
  )
  evidences!: Evidence[];
}
