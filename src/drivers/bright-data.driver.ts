import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { BaseDriver } from "./base.driver";

/**
 * All the data from InstagramDriver is scraped from BrightData
 * Because Instagram doesn't allow us to access other profile public data we need to scrap them
 *
 * We don't need a driver for this, we can just add the bearer token to the headers each request
 */
@bind()
@injectable()
export class BrightDataDriver extends BaseDriver {}
