import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  status: string;  // e.g., 'new', 'contacted', 'qualified', 'converted'

  @Column()
  source: string;  // e.g., 'website', 'referral', 'ads'
}