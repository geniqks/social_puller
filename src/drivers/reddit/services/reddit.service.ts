import { Injectable } from '@nestjs/common';

@Injectable()
export class RedditService {
  public async getSubredditPosts(_subreddit: string): Promise<any> {}
}
