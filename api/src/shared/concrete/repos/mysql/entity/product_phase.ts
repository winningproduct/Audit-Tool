import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product';
import { User } from './user';
import { Phase } from './phase';

const ENTITY_NAME = 'ProductPhase';

@Entity(ENTITY_NAME)
export class ProductPhase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: number;

  @Column()
  phaseId!: number;

  @Column()
  score!: number;

  @ManyToOne(
    type => Product,
    product => product.productPhases,
  )
  product!: Product;

  @ManyToOne(
    type => Phase,
    phase => phase.productPhases,
  )
  phase!: Phase;
}
