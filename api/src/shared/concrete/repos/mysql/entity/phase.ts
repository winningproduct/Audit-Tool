import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductPhase } from './product_phase';
import { Revision } from './revision';
import { KnowledgeArea } from './knowledge_area';

const ENTITY_NAME = 'Phase';

@Entity(ENTITY_NAME)
export class Phase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(
    type => ProductPhase,
    productPhase => productPhase.phase,
  )
  productPhases!: ProductPhase[];

  @OneToMany(
    type => Revision,
    revision => revision.phase,
  )
  revisions!: Revision[];

  @OneToMany(
    type => KnowledgeArea,
    knowledgeArea => knowledgeArea.phase,
  )
  knowledgeAreas!: KnowledgeArea[];
}
