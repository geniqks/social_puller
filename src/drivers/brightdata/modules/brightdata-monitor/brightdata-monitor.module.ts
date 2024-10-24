import { Module } from '@nestjs/common';
import {
  BRIGHTDATA_MONITOR_MODEL,
  BrightDataMonitorModel,
} from './model/brightdata-monitor.model';
import { BrightDataMonitorRepository } from './repositories/brightdata-monitor.repository';

const exported = [BrightDataMonitorRepository];

@Module({
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
