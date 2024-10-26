import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HttpModule.register({
      global: true,
    }),
    DatabaseModule,
    ConfigModule,
  ],
})
export class CommonModule {}
