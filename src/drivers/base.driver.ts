import { injectable } from "inversify";

@injectable()
export abstract class BaseDriver {
  /**
   * This method is used to get the access token from the driver's API
   */
  public async authorize(): Promise<void | string> {}

  /**
   * This method is used to handle the callback from the driver's API after authentication.
   * It is used to get the access token and other necessary information to make requests to the API from the OAuth2 flow
   */
  public async callbackHandler(...args: any[]): Promise<void | boolean> {}
}
