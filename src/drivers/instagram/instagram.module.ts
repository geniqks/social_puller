import { BrightdataModule } from '@drivers/brightdata/brightdata.module';
import { Module } from '@nestjs/common';
import { PostsModule } from '@social-media-content/posts/posts.module';
import { ProfilesModule } from '@social-media-content/profiles/profiles.module';
import { InstagramService } from './services/instagram.service';
import { InstagramController } from './controllers/instagram.controller';

const exported = [InstagramService];

@Module({
  controllers: [InstagramController],
  providers: [...exported],
  exports: [...exported],
  imports: [BrightdataModule, PostsModule, ProfilesModule],
})
export class InstagramModule {}
