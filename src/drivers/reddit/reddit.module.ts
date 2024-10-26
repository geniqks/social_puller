import { Module } from '@nestjs/common';
import { RedditController } from './controllers/reddit.controller';
import { RedditDriver } from './driver/reddit.driver';
import { RedditService } from './services/reddit.service';

const exported = [RedditService];

@Module({
  controllers: [RedditController],
  providers: [...exported, RedditDriver],
  exports: [...exported],
})
export class RedditModule {}
