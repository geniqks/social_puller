import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { BaseDriver } from "./base.driver";

/**
 * All the data from InstagramDriver is scraped from BrightData
 * Because Instagram doesn't allow us to access other profile public data we need to scrap them
 */
@bind()
@injectable()
export class InstagramDriver extends BaseDriver {}
