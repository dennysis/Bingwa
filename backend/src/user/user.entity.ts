import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Ensure this matches your table name
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone_number: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    kra_pin: string;

    @Column()
    role: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}