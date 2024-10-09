import { injectable } from "inversify";

@injectable()
export abstract class BaseDriver {
  /**
   * This method is used to authenticate and establish a connection to the driver's API
   * using various methods such as OAuth2, Bearer token, or Basic Auth.
   */
  async authenticate<T>(): Promise<T | void> {}

  /**
   * This method is used to handle the callback from the driver's API after authentication.
   * It is used to get the access token and other necessary information to make requests to the API from the OAuth2 flow
   */
  async callbackHandler(): Promise<void> {}
}
