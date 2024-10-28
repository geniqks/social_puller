import { BrightdataService } from '@drivers/brightdata/services/brightdata.service';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '@social-media-content/posts/repositories/post.repository';
import { ProfileRepository } from '@social-media-content/profiles/repositories/profile.repository';
import {
  ITwitterPosts,
  ITwitterProfile,
} from '../interfaces/twitter.interface';

@Injectable()
export class TwitterService {
  constructor(
    private readonly brightDataService: BrightdataService,
    private readonly postRepository: PostRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async registerPosts(posts: ITwitterPosts[]) {
    const formattedPosts =
      await this.brightDataService.filterAndCleanBrightDataResponses(posts);
    await this.postRepository.createTwitterPost(formattedPosts);
  }

  public async registerProfile(profile: ITwitterProfile[]) {
    const formattedProfile =
      await this.brightDataService.filterAndCleanBrightDataResponses(profile);
    await this.profileRepository.createTwitterProfile(formattedProfile);
  }

  public async getProfile(urls: string[]) {
    return this.brightDataService.prepareAndTriggerBrightData(
      'twitter_profile',
      'twitter/profile/webhook',
      urls,
    );
  }

  public async getPosts(urls: string[]) {
    return this.brightDataService.prepareAndTriggerBrightData(
      'twitter_posts',
      'twitter/posts/webhook',
      urls,
    );
  }
}
