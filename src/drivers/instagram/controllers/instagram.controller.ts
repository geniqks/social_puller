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
  IInstagramComments,
  IInstagramPosts,
  IInstagramProfile,
} from '../interfaces/instagram.interface';
import { InstagramService } from '../services/instagram.service';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Get('comments')
  public async getComments(@Query(ValidationPipe) query: UrlsValidatorDto) {
    return this.instagramService.getComments(query.urls);
  }

  @Post('comments/webhook')
  public async commentsWebhook(
    @Body() instagramComments: IInstagramComments[],
  ) {
    console.log(instagramComments);
  }

  @Get('posts')
  public async getPosts(@Query(ValidationPipe) query: UrlsValidatorDto) {
    return this.instagramService.getPosts(query.urls);
  }

  @Post('posts/webhook')
  public async postsWebhook(@Body() instagramPosts: IInstagramPosts[]) {
    this.instagramService.registerPosts(instagramPosts);
  }

  @Get('profile')
  public async getProfile(@Query(ValidationPipe) query: UrlsValidatorDto) {
    return this.instagramService.getProfile(query.urls);
  }

  @Post('profile/webhook')
  public async profileWebhook(@Body() instagramProfile: IInstagramProfile[]) {
    this.instagramService.registerProfile(instagramProfile);
  }

  @Get('reels')
  public async getReels() {}

  @Post('reels/webhook')
  public async reelsWebhook() {}
}
