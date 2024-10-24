import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [PostsModule, ProfilesModule],
})
export class SocialMediaContentModule {}
