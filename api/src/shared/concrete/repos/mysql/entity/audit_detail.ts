import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product';
import { User } from './user';

const ENTITY_NAME = 'AuditDetail';

@Entity(ENTITY_NAME)
export class AuditDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: number;

  @Column()
  userId!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @ManyToOne(
    type => Product,
    product => product.auditDetails,
  )
  product!: Product;

  @ManyToOne(
    type => User,
    user => user.auditDetails,
  )
  user!: User;
}
