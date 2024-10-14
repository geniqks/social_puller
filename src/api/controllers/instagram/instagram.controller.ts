import { bind } from "@decorators/bind.decorator";
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
}
