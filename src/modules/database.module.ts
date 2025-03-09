import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesManagers } from '../entities/sales_managers.entity';
import { Slots } from '../entities/slots.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DATABASE_HOST', 'localhost'),
                port: configService.get('POSTGRES_PORT', 5432),
                username: configService.get('POSTGRES_USER', 'postgres'),
                password: configService.get('POSTGRES_PASSWORD', 'mypassword123!'),
                database: configService.get('POSTGRES_DB', 'coding-challenge'),
                entities: [Slots],
                synchronize: false,
            }),
        }),
        TypeOrmModule.forFeature([Slots, SalesManagers]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { } 