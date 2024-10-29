import { LogModule } from '@core/log/log.module';
import { Module } from '@nestjs/common';
import { BrightdataDriver } from './driver/brightdata.driver';
import { BrightdataMonitorModule } from './modules/brightdata-monitor/brightdata-monitor.module';
import { BrightdataService } from './services/brightdata.service';

const exported = [BrightdataDriver, BrightdataService];

@Module({
  imports: [BrightdataMonitorModule, LogModule],
  providers: [...exported],
  exports: [...exported],
})
export class BrightdataModule {}
