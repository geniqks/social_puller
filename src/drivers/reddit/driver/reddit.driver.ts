import { BaseDriver } from '@drivers/abstracts/base.driver.abstract';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import * as fs from 'fs';
import { catchError, firstValueFrom } from 'rxjs';
import { EnvironmentVariables } from 'src/common/config/validate-env';
@Injectable()
export class RedditDriver extends BaseDriver {
  @Inject(HttpService)
  private readonly httpService: HttpService;

  @Inject(ConfigService)
  private readonly configService: ConfigService<EnvironmentVariables>;

  /**
   * The process of autentication is inspired from this repository
   * https://github.com/adanzweig/nodejs-reddit/blob/master/index.js
   * https://www.youtube.com/watch?v=y3OoUsn3k8c&ab_channel=CodingwithAdo
   *
   * First step is to get the user authorization we can have it by going to the returned url to give the app the right to access the user data
   *
   * For more information about the authorization you can refer to the documentation below
   * https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization
   */
  public async authorize(): Promise<string> {
    // All scopes are available here
    // https://www.reddit.com/api/v1/scopes
    const scopes = [
      'identity',
      'edit',
      'flair',
      'history',
      'modconfig',
      'modflair',
      'modlog',
      'modposts',
      'modwiki',
      'mysubreddits',
      'privatemessages',
      'read',
      'report',
      'save',
      'submit',
      'subscribe',
      'vote',
      'wikiedit',
      'wikiread',
    ];

    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${this.configService.get(
      'REDDIT_CLIENT_ID',
    )}&response_type=code&state=RANDOM&redirect_uri=${this.configService.get(
      'REDDIT_REDIRECT_URI',
    )}&duration=permanent&scope=${scopes.join(' ')}`;

    return authUrl;
  }

  /**
   * After the user is redirected to the callback URL, we obtain an access token from the Reddit API.
   * This token, which doesn't expire, is used for making subsequent API requests.
   * As we're operating in a bot context, we store the token in a file named 'reddit_token.txt' for persistent access across sessions.
   *
   * Note: The token will need to be saved in the .env file. Once this is done you need to delete 'reddit_token.txt'
   */
  public async callbackHandler(code: string): Promise<void> {
    const response = await firstValueFrom(
      this.httpService
        .post<{ access_token: string }>(
          'https://www.reddit.com/api/v1/access_token',
          {
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.configService.get('REDDIT_REDIRECT_URI'),
          },
          {
            headers: {
              'User-Agent': this.configService.get('REDDIT_USER_AGENT'),
            },
            auth: {
              username: this.configService.get('REDDIT_CLIENT_ID'),
              password: this.configService.get('REDDIT_CLIENT_SECRET'),
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            Logger.error(error.response.data);
            throw Error('Error while fetching access token from Reddit');
          }),
        ),
    );

    fs.writeFile('reddit_token.txt', response.data.access_token, (err) => {
      if (err) {
        Logger.error("Couldn't save token");
      } else {
        Logger.log('Token saved');
      }
    });
  }
}
