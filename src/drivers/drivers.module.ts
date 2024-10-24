import { Module } from '@nestjs/common';
import { BrightdataModule } from './brightdata/brightdata.module';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [BrightdataModule, InstagramModule],
})
export class DriversModule {}
