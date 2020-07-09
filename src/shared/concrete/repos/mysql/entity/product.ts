import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AuditDetail } from './audit_detail';
import { ProductPhase } from './product_phase';
import { Organization } from './organization';
import { User } from './user';
import { Evidence } from './evidence';

const ENTITY_NAME = 'Product';

@Entity(ENTITY_NAME)
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate!: Date;

  @OneToMany(
    type => AuditDetail,
    auditDetail => auditDetail.product,
  )
  auditDetails!: AuditDetail[];

  @OneToMany(
    type => ProductPhase,
    productPhase => productPhase.product,
  )
  productPhases!: ProductPhase[];

  @ManyToOne(
    type => User,
    user => user.products,
  )
  user!: User;

  @ManyToOne(
    type => Organization,
    organization => organization.products,
  )
  organization!: Organization;

  @OneToMany(
    type => Evidence,
    evidence => evidence.product,
  )
  evidences!: Evidence[];

  @ManyToMany(type => User)
  @JoinTable()
  users!: User[];
}
