import { bind } from "@decorators/bind.decorator";
import { IBrightDataResponse } from "@interfaces/brightdata.interface";
import { PostRepository } from "@repositories/post.repository";
import { injectable } from "inversify";
import { IInstagramPosts } from "src/interfaces/instagram.interface";
import { BrightDataController } from "../brightdata/brightdata.controller";

@bind()
@injectable()
export class InstagramController {
  constructor(
    private readonly brightDataController: BrightDataController,
    private readonly postRepository: PostRepository
  ) {}

  public async registerPosts(posts: IInstagramPosts[]) {
    const formattedPosts =
      await this.brightDataController.filterAndCleanBrightDataResponses(posts);
    await this.postRepository.createPost(formattedPosts as IInstagramPosts[]);
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
      "instagram/profiles/webhook",
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
