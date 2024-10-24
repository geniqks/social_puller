import { bind } from "@decorators/bind.decorator";
import { ConfigService } from "@services/config.service";
import { LoggerService } from "@services/logger.service";
import axios, { AxiosRequestConfig } from "axios";
import * as fs from "fs";
import { injectable } from "inversify";
import { BaseDriver } from "./base.driver";
@bind()
@injectable()
export class RedditDriver extends BaseDriver {
  private client_id: string;
  private client_secret: string;
  private redirect_uri: string;
  private user_agent: string;

  constructor(
    private readonly loggerService: LoggerService,
    readonly configService: ConfigService
  ) {
    super();
    this.client_id = configService.get<string>("REDDIT_CLIENT_ID");
    this.client_secret = configService.get<string>("REDDIT_CLIENT_SECRET");
    this.redirect_uri = configService.get<string>("REDDIT_REDIRECT_URI");
    this.user_agent = configService.get<string>("REDDIT_USER_AGENT");
  }

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
      "identity",
      "edit",
      "flair",
      "history",
      "modconfig",
      "modflair",
      "modlog",
      "modposts",
      "modwiki",
      "mysubreddits",
      "privatemessages",
      "read",
      "report",
      "save",
      "submit",
      "subscribe",
      "vote",
      "wikiedit",
      "wikiread",
    ];

    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${
      this.client_id
    }&response_type=code&state=RANDOM&redirect_uri=${
      this.redirect_uri
    }&duration=permanent&scope=${scopes.join(" ")}`;

    return authUrl;
  }

  /**
   * After the user is redirected to the callback URL, we obtain an access token from the Reddit API.
   * This token, which doesn't expire, is used for making subsequent API requests.
   * As we're operating in a bot context, we store the token in a file named 'reddit_token.txt' for persistent access across sessions.
   *
   * Note: The token will need to be saved in the .env file. Once this is done you need to delete 'reddit_token.txt'
   */
  public async callbackHandler(code: string): Promise<boolean> {
    const axiosOptions: AxiosRequestConfig = {
      method: "POST",
      url: "https://www.reddit.com/api/v1/access_token",
      params: {
        grant_type: "authorization_code",
        code,
        redirect_uri: this.redirect_uri,
      },
      headers: {
        "User-Agent": this.user_agent,
      },
      auth: {
        username: this.client_id,
        password: this.client_secret,
      },
    };

    try {
      const response = await axios<{ access_token: string }>(axiosOptions);
      fs.writeFile("reddit_token.txt", response.data.access_token, (err) => {
        if (err) {
          this.loggerService.pino.error("Couldn't save token");
        } else {
          this.loggerService.pino.info("Token saved");
        }
      });
      return true;
    } catch (error) {
      this.loggerService.pino.error("Error", error);
      return false;
    }
  }
}
