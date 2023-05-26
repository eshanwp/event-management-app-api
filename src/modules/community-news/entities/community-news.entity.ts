import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../base/entities/base.entity';

@Entity()
export class CommunityNews extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', length: 256 })
  title: string;

  @Column({ name: 'description', length: 256 })
  description: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'author', length: 256 })
  author: string;
}
