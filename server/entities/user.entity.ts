import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type UserRoleType = "admin" | "user"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column('varchar')
  password: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user"
  })
  role: UserRoleType

  @Column({
    type: 'jsonb',
    default: []
  })
  has_access_of: {};


  @Column({
    type: 'timestamp',
    default: new Date().toISOString()
  })
  created_at: string;

  @Column({
    type: 'timestamp',
    default: new Date().toISOString()
  })updated_at: string;
}
