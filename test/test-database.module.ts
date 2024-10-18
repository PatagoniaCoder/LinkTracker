import { Module } from '@nestjs/common';
import { SqliteDatabaseModule } from '../src/database/sqlite/sqlite-database.module';
import { LinkGeneratorRepository } from '../src/link-generator/repository/link-generator.repository';
import { SqliteDatabaseService } from '../src/database/sqlite/sqlite-database.service';

@Module({
  imports: [SqliteDatabaseModule],
  providers: [
    { provide: LinkGeneratorRepository, useExisting: SqliteDatabaseService },
  ],
  exports: [LinkGeneratorRepository],
})
export class TestDatabaseModule {}
