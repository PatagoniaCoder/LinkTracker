import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { LinkEntity } from '../../link-generator/entity/link.entity';
import {
  MYSQL_DATABASE_NAME,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USERNAME,
  NODE_ENV,
} from '../../shared/constant';
import { MySqlDatabaseService } from './mysql-database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService) => ({
        type: 'mysql',
        host: configService.get(MYSQL_HOST),
        port: Number(configService.get(MYSQL_PORT)),
        database: configService.get(MYSQL_DATABASE_NAME),
        autoLoadEntities: true,
        synchronize: configService.get(NODE_ENV) === 'development',
        username: configService.get(MYSQL_USERNAME),
        password: configService.get(MYSQL_PASSWORD),
        entities: [LinkEntity],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([LinkEntity]),
  ],

  providers: [MySqlDatabaseService],
  exports: [MySqlDatabaseService],
})
export class MySqlDatabaseModule {}
