import { Module } from '@nestjs/common';
import { BrightdataModule } from './brightdata/brightdata.module';
import { InstagramModule } from './instagram/instagram.module';
import { RedditModule } from './reddit/reddit.module';

@Module({
  imports: [BrightdataModule, InstagramModule, RedditModule],
})
export class DriversModule {}
