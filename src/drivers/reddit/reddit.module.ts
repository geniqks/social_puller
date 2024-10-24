import { Module } from '@nestjs/common';
import { RedditController } from './controllers/reddit.controller';
import { RedditService } from './services/reddit.service';

const exported = [RedditService];

@Module({
  controllers: [RedditController],
  providers: [...exported],
  exports: [...exported],
})
export class RedditModule {}
