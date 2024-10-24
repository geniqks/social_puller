import { Module } from '@nestjs/common';
import {
  BRIGHTDATA_MONITOR_MODEL,
  BrightDataMonitorModel,
} from './model/brightdata-monitor.model';
import { BrightDataMonitorRepository } from './repositories/brightdata-monitor.repository';
import { BrightDataMonitorController } from './controllers/brightdata-monitor.controller';

const exported = [BrightDataMonitorRepository];

@Module({
  controllers: [BrightDataMonitorController],
  providers: [
    ...exported,
    {
      useValue: BrightDataMonitorModel,
      provide: BRIGHTDATA_MONITOR_MODEL,
    },
  ],
  exports: exported,
})
export class BrightdataMonitorModule {}
