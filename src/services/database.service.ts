import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slots } from '../entities/slots.entity';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(Slots)
        private calendarSlotRepository: Repository<Slots>,
    ) { }

    async findSlotsByDate(date: string): Promise<Slots[]> {
        return this.calendarSlotRepository.find({
            where: {
                start_date: new Date(date)
            },
        });
    }
} 