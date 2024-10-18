import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinkGeneratorModule } from './link-generator/link-generator.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LinkGeneratorModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
