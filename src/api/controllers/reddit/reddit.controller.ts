import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";

@bind()
@injectable()
export class RedditController {
  public async getSubredditPosts(_subreddit: string): Promise<any> {}
}
