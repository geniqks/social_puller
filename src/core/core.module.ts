import { LogModule } from '@core/log/log.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [LogModule],
})
export class CoreModule {}
