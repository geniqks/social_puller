import { BaseDriver } from '@drivers/abstracts/base.driver.abstract';
import { Injectable } from '@nestjs/common';

/**
 * All the data from InstagramDriver is scraped from BrightData
 * Because Instagram doesn't allow us to access other profile public data we need to scrap them
 *
 * We don't need a driver for this, we can just add the bearer token to the headers each request
 */
@Injectable()
export class BrightdataDriver extends BaseDriver {}
