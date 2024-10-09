import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { BaseDriver } from "./base.driver";

@bind()
@injectable()
export class RedditDriver extends BaseDriver {
  /**
   * The process of autentication is inspired from this repository
   * https://github.com/adanzweig/nodejs-reddit/blob/master/index.js
   * https://www.youtube.com/watch?v=y3OoUsn3k8c&ab_channel=CodingwithAdo
   *
   * First step is to get the user authorization we can have it by going to this url
   * https://www.reddit.com/api/v1/authorize?client_id=...&response_type=code&state=RANDOM_STRING&redirect_uri=http://localhost:3000&duration=permanent&scope=identity
   * For more information about the authorization you can refer to the documentation below
   * https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization
   *
   */
  async authenticate(): Promise<void> {}

  async callbackHandler(): Promise<void> {}
}
