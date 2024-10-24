import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AxiosModule } from './axios/axios.module';

@Module({
  imports: [DatabaseModule, ConfigModule, AxiosModule]
})
export class CommonModule {}
