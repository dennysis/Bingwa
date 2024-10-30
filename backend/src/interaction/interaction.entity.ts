import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Interaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  description: string;

  @Column()
  date: Date;
}