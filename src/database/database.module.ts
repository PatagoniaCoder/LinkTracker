import { Module } from '@nestjs/common';
import { LinkGeneratorRepository } from '../link-generator/repository/link-generator.repository';
import { MySqlDatabaseModule } from './mysql/mysql-database.module';
import { MySqlDatabaseService } from './mysql/mysql-database.service';

@Module({
  imports: [MySqlDatabaseModule], // selectable MySqlDatabaseModule,
  providers: [
    { provide: LinkGeneratorRepository, useExisting: MySqlDatabaseService }, // selectable MySqlDatabaseService,
  ],
  exports: [LinkGeneratorRepository],
})
export class DatabaseModule {}
