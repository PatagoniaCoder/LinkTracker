import { Module } from '@nestjs/common';
import { LinkGeneratorRepository } from '../link-generator/repository/link-generator.repository';
import { SqliteDatabaseModule } from './sqlite/sqlite-database.module';
import { SqliteDatabaseService } from './sqlite/sqlite-database.service';
import { MySqlDatabaseService } from './mysql/mysql-database.service';
import { MySqlDatabaseModule } from './mysql/mysql-database.module';

@Module({
  imports: [MySqlDatabaseModule], // selectable MySqlDatabaseModule,
  providers: [
    { provide: LinkGeneratorRepository, useExisting: MySqlDatabaseService }, // selectable MySqlDatabaseService,
  ],
  exports: [LinkGeneratorRepository],
})
export class DatabaseModule {}
