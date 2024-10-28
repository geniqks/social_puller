import { BaseDriver } from '@drivers/abstracts/base.driver.abstract';
import { Injectable } from '@nestjs/common';

/**
 * We can manually get a Bearer Token from twitter developer portal
 * We don't need a driver for this, we can just add the bearer token to the headers each request
 *
 * https://developer.x.com/en/docs/authentication/oauth-2-0/bearer-tokens
 */
@Injectable()
export class TwitterDriver extends BaseDriver {}
