import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SalesManagers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', array: true })
    languages: string[];

    @Column({ type: 'varchar', array: true })
    products: string[];

    @Column({ type: 'varchar', array: true })
    customer_ratings: string[];
} 