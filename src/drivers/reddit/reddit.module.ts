import { Module } from '@nestjs/common';
import { RedditService } from './services/reddit.service';

const exported = [RedditService];

@Module({
  providers: [...exported],
  exports: [...exported],
})
export class RedditModule {}
