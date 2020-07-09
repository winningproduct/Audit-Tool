import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Organization } from './organization';

const ENTITY_NAME = 'Domain';

@Entity(ENTITY_NAME)
export class Domain {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  domain!: string;

  @ManyToOne(
    type => Organization,
    organization => organization.domains,
  )
  organization!: Organization;
}
