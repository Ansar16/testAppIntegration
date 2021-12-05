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
    type: 'json',
    default: []
  })
  has_access_of: {};

  
  @Column('timestamp')
  created_at: string;

  @Column('timestamp')
  updated_at: string;
}
