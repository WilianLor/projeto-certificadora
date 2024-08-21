import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AppConfigType } from '../config/data.config';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { database, host, port, password, username } =
      this.configService.get<AppConfigType['database']>('database');

    return {
      type: 'postgres',
      host,
      port,
      database,
      username,
      password,
    };
  }
}
