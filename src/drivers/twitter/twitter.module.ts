import { Module } from '@nestjs/common';
import { TwitterController } from './controllers/twitter.controller';
import { TwitterDriver } from './driver/twitter.driver';

const exporteds = [TwitterDriver];
@Module({
  controllers: [TwitterController],
  providers: [...exporteds],
  exports: [...exporteds],
})
export class TwitterModule {}
