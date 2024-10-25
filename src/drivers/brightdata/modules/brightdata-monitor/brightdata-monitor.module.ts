import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrightDataMonitorController } from './controllers/brightdata-monitor.controller';
import { BrightDataMonitorRepository } from './repositories/brightdata-monitor.repository';
import {
  BrightDataMonitorModel,
  BrightDataMonitorSchema,
} from './schemas/brightdata-monitor.schema';

const exported = [BrightDataMonitorRepository];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BrightDataMonitorModel.name,
        schema: BrightDataMonitorSchema,
      },
    ]),
  ],
  controllers: [BrightDataMonitorController],
  providers: [...exported],
  exports: exported,
})
export class BrightdataMonitorModule {}
