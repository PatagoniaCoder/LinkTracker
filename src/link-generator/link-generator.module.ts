import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LinkGeneratorController } from './link-generator.controller';
import { LinkGeneratorService } from './link-generator.service';

@Module({
  imports: [DatabaseModule],
  providers: [LinkGeneratorService],
  controllers: [LinkGeneratorController],
})
export class LinkGeneratorModule {}
