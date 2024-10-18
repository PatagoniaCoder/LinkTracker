import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from '../../link-generator/entity/link.entity';
import { SqliteDatabaseService } from './sqlite-database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'links.db',
      entities: [LinkEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([LinkEntity]),
  ],

  providers: [SqliteDatabaseService],
  exports: [SqliteDatabaseService],
})
export class SqliteDatabaseModule {}
