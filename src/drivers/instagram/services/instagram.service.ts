import { IBrightDataResponse } from '@drivers/brightdata/interfaces/brightdata.interface';
import { BrightdataService } from '@drivers/brightdata/services/brightdata.service';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '@social-media-content/posts/repositories/post.repository';
import {
  IInstagramPosts,
  IInstagramProfile,
} from '../interfaces/instagram.interface';
import { ProfileRepository } from '@social-media-content/profiles/repositories/profile.repository';

@Injectable()
export class InstagramService {
  constructor(
    private readonly brightDataService: BrightdataService,
    private readonly postRepository: PostRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async registerPosts(posts: IInstagramPosts[]) {
    const formattedPosts =
      await this.brightDataService.filterAndCleanBrightDataResponses(posts);
    await this.postRepository.createInstagramPost(formattedPosts);
  }

  public async registerProfile(profile: IInstagramProfile[]) {
    const formattedProfiles =
      await this.brightDataService.filterAndCleanBrightDataResponses(profile);
    await this.profileRepository.createInstagramProfile(formattedProfiles);
  }

  /**
   * Get instagram comments from any instagram content
   */
  public async getInstagramComments(
    urls: string[],
  ): Promise<IBrightDataResponse | void> {
    return this.brightDataService.prepareAndTriggerBrightData(
      'instagram_comments',
      'instagram/comments/webhook',
      urls,
    );
  }

  public async getInstagramPosts(
    urls: string[],
  ): Promise<IBrightDataResponse | void> {
    return this.brightDataService.prepareAndTriggerBrightData(
      'instagram_posts',
      'instagram/posts/webhook',
      urls,
    );
  }

  public async getInstagramProfile(
    urls: string[],
  ): Promise<IBrightDataResponse | void> {
    return this.brightDataService.prepareAndTriggerBrightData(
      'instagram_profile',
      'instagram/profile/webhook',
      urls,
    );
  }

  public async getInstagramReels(
    urls: string[],
  ): Promise<IBrightDataResponse | void> {
    return this.brightDataService.prepareAndTriggerBrightData(
      'instagram_reels',
      'instagram/reels/webhook',
      urls,
    );
  }
}
