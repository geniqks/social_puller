import { BaseDriver } from '@drivers/abstracts/base.driver.abstract';
import { Injectable } from '@nestjs/common';

/**
 * All the data from InstagramDriver is scraped from BrightData
 * Because Instagram doesn't allow us to access other profile public data we need to scrap them
 */
@Injectable()
export class InstagramDriver extends BaseDriver {}
