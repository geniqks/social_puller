import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { BaseDriver } from "./base.driver";

/**
 * We can manually get a Bearer Token from twitter developer portal
 * We don't need a driver for this, we can just add the bearer token to the headers each request
 * 
 * https://developer.x.com/en/docs/authentication/oauth-2-0/bearer-tokens
 */
@bind()
@injectable()
export class TwitterDriver extends BaseDriver { }
