import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { dataConfig } from './data.config';

const ConfigModuleExports = NestConfigModule.forRoot({
  isGlobal: true,
  load: [dataConfig],
});

@Global()
@Module({
  imports: [ConfigModuleExports],
  exports: [ConfigModuleExports],
})
export class ConfigModule {}
