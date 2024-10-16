import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from '../link-generator/entity/link.entity';
import { DatabaseService } from './database.service';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'links.db',
      entities: [join(__dirname, '../**/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([LinkEntity]),
  ],

  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
