import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('reddit')
export class RedditController {
  @Get('auth')
  public async auth(@Query() query: { urls: string[] }): Promise<string> {
    return 'salut';
  }

  @Get('auth/callback')
  public async getAuthCallback(): Promise<string> {
    return 'salut';
  }

  @Get('/r/:subreddit')
  public async getSubreddit(
    @Param('subreddit') subreddit: string,
  ): Promise<string> {
    return subreddit;
  }
}
