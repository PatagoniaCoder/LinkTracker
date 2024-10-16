import { Module } from '@nestjs/common';
import { LinkGeneratorService } from './link-generator.service';
import { LinkGeneratorController } from './link-generator.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LinkGeneratorService],
  controllers: [LinkGeneratorController],
})
export class LinkGeneratorModule {}
