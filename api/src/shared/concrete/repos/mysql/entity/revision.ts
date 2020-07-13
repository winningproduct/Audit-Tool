import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Phase } from './phase';
import { Question } from './question';

const ENTITY_NAME = 'Revision';

@Entity(ENTITY_NAME)
export class Revision {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  releaseNotes!: string;

  @Column()
  version!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate!: Date;

  @ManyToOne(
    type => Phase,
    phase => phase.revisions,
  )
  phase!: Phase;

  @OneToMany(
    type => Question,
    question => question.revision,
  )
  questions!: Question[];
}
