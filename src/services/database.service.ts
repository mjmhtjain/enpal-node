import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesManagers } from '../entities/sales_managers.entity';
import { Slots } from '../entities/slots.entity';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(Slots)
        private calendarSlotRepository: Repository<Slots>,
        @InjectRepository(SalesManagers)
        private salesManagerRepository: Repository<SalesManagers>,
    ) { }

    async findSlotsByDate(date: string): Promise<Slots[]> {
        return this.calendarSlotRepository
            .createQueryBuilder('slots')
            .leftJoinAndMapOne(
                'slots.sales_manager',
                'sales_managers',
                'sm',
                'slots.sales_manager_id = sm.id'
            )
            .where('DATE(slots.start_date) = :date', { date })
            .getMany();
    }
} 