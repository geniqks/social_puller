import { UrlsValidatorDto } from '@drivers/dto/validators/urls-validator.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ITwitterPosts,
  ITwitterProfile,
} from '../interfaces/twitter.interface';
import { TwitterService } from '../services/twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get('profile')
  public async getProfile(@Query(ValidationPipe) query: UrlsValidatorDto) {
    return this.twitterService.getProfile(query.urls);
  }

  @Post('profile/webhook')
  public async profileWebhook(@Body() twitterProfile: ITwitterProfile[]) {
    this.twitterService.registerProfile(twitterProfile);
  }

  @Get('posts')
  public async getPosts(@Query(ValidationPipe) query: UrlsValidatorDto) {
    return this.twitterService.getPosts(query.urls);
  }

  @Post('posts/webhook')
  public async postsWebhook(@Body() twitterPosts: ITwitterPosts[]) {
    this.twitterService.registerPosts(twitterPosts);
  }
}
