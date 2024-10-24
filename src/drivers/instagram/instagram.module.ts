import { BrightdataModule } from '@drivers/brightdata/brightdata.module';
import { Module } from '@nestjs/common';
import { PostsModule } from '@social-media-content/posts/posts.module';
import { ProfilesModule } from '@social-media-content/profiles/profiles.module';
import { InstagramService } from './services/instagram.service';

const exported = [InstagramService];

@Module({
  providers: [...exported],
  exports: [...exported],
  imports: [BrightdataModule, PostsModule, ProfilesModule],
})
export class InstagramModule {}
