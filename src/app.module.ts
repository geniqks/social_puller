import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { DriversModule } from './drivers/drivers.module';
import { SocialMediaContentModule } from './social-media-content/social-media-content.module';

@Module({
  imports: [CommonModule, DriversModule, SocialMediaContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
