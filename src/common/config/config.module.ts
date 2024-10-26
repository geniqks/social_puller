import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validate } from './validate-env';
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
