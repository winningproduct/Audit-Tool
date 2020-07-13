import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Domain } from './domain';
import { User } from './user';
import { Product } from './product';

const ENTITY_NAME = 'Organization';

@Entity(ENTITY_NAME)
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate!: Date;

  @OneToMany(
    type => Domain,
    domain => domain.organization,
  )
  domains!: Domain[];

  @OneToMany(
    type => User,
    user => user.organization,
  )
  users!: User[];

  @OneToMany(
    type => Product,
    product => product.organization,
  )
  products!: Product[];
}
