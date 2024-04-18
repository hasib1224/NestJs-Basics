import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
  
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
  
}