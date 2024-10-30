import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { DriversModule } from './drivers/drivers.module';
import { SocialMediaContentModule } from './social-media-content/social-media-content.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, DriversModule, SocialMediaContentModule, CoreModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
