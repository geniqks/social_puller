import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';
import { RedditDriver } from '../driver/reddit.driver';

@Controller('reddit')
export class RedditController {
  constructor(private readonly redditDriver: RedditDriver) {}

  @Get('auth')
  @Redirect()
  public async auth() {
    const authUrl = await this.redditDriver.authorize();
    return {
      url: authUrl,
    };
  }

  @Get('auth/callback')
  public async getAuthCallback(
    @Query() query: { code: string; state: string },
  ) {
    const hasBeenAuthorized = await this.redditDriver.callbackHandler(
      query.code,
    );

    if (hasBeenAuthorized) {
      return { message: ReasonPhrases.OK };
    } else {
      return { message: ReasonPhrases.UNAUTHORIZED };
    }
  }

  @Get('/r/:subreddit')
  public async getSubreddit(
    @Param('subreddit') subreddit: string,
  ): Promise<string> {
    return subreddit;
  }
}
