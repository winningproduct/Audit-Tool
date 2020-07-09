import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question';
import { User } from './user';
import { Product } from './product';

const ENTITY_NAME = 'Evidence';

@Entity(ENTITY_NAME)
export class Evidence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  status!: string;

  @Column()
  version!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate!: Date;

  @ManyToOne(
    type => User,
    user => user.evidences,
  )
  user!: User;

  @ManyToOne(
    type => Question,
    question => question.evidences,
  )
  question!: Question;

  @ManyToOne(
    type => Product,
    product => product.evidences,
  )
  product!: Product;
}
