import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Slots {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    start_date: Date;

    @Column({ type: 'timestamp' })
    end_date: Date;

    @Column({ type: 'boolean' })
    booked: boolean;

    @Column({ type: 'integer' })
    sales_manager_id: number;
} 