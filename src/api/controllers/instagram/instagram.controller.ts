import { bind } from "@decorators/bind.decorator";
import { IBrightDataResponse } from "@interfaces/brightdata.interface";
import { PostRepository } from "@repositories/post.repository";
import { ProfileRepository } from "@repositories/profile.repository";
import { injectable } from "inversify";
import {
  IInstagramPosts,
  IInstagramProfile,
} from "src/interfaces/instagram.interface";
import { BrightDataController } from "../brightdata/brightdata.controller";

@bind()
@injectable()
export class InstagramController {
  constructor(
    private readonly brightDataController: BrightDataController,
    private readonly postRepository: PostRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  public async registerPosts(posts: IInstagramPosts[]) {
    const formattedPosts =
      await this.brightDataController.filterAndCleanBrightDataResponses(posts);
    await this.postRepository.createInstagramPost(formattedPosts);
  }

  public async registerProfile(profile: IInstagramProfile[]) {
    const formattedProfiles =
      await this.brightDataController.filterAndCleanBrightDataResponses(
        profile
      );
    await this.profileRepository.createInstagramProfile(formattedProfiles);
  }

  /**
   * Get instagram comments from any instagram content
   */
  public async getInstagramComments(
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    return this.brightDataController.prepareAndTriggerBrightData(
      "instagram_comments",
      "instagram/comments/webhook",
      urls
    );
  }

  public async getInstagramPosts(
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    return this.brightDataController.prepareAndTriggerBrightData(
      "instagram_posts",
      "instagram/posts/webhook",
      urls
    );
  }

  public async getInstagramProfile(
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    return this.brightDataController.prepareAndTriggerBrightData(
      "instagram_profile",
      "instagram/profile/webhook",
      urls
    );
  }

  public async getInstagramReels(
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    return this.brightDataController.prepareAndTriggerBrightData(
      "instagram_reels",
      "instagram/reels/webhook",
      urls
    );
  }
}
