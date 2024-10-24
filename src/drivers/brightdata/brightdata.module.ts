import { Module } from '@nestjs/common';
import { BrightDataController } from './controllers/brightdata.controller';
import { BrightdataDriver } from './driver/brightdata.driver';
import { BrightdataMonitorModule } from './modules/brightdata-monitor/brightdata-monitor.module';
import { BrightdataService } from './services/brightdata.service';

const exported = [BrightdataDriver, BrightdataService];

@Module({
  controllers: [BrightDataController],
  imports: [BrightdataMonitorModule],
  providers: [...exported],
  exports: [...exported],
})
export class BrightdataModule {}
