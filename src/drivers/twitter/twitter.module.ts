import { Module } from '@nestjs/common';
import { TwitterController } from './controllers/twitter.controller';
import { TwitterService } from './driver/twitter.driver';

const exporteds = [TwitterService];
@Module({
  controllers: [TwitterController],
  providers: [...exporteds],
  exports: [...exporteds],
})
export class TwitterModule {}
