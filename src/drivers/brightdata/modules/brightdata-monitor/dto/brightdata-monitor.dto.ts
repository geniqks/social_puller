import { BrightDataStatusEnum } from '@drivers/brightdata/enums/bright-data-status.enum';
import { prop } from '@typegoose/typegoose';

/**
 * This model will be used to monitor the request to BrightData
 * It will be used to limit the number of request to BrightData
 */
export class BrightDataMonitorDto {
  @prop()
  public snapshot_id!: string;

  @prop()
  public dataset_id!: string;

  @prop()
  public url!: string;

  @prop({ type: () => [String] })
  public requested_urls?: string[];

  @prop()
  public error_message?: string;

  // https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview#monitor-progress
  @prop()
  public status!: BrightDataStatusEnum;

  @prop({ default: () => new Date() })
  public created_at!: Date;
}
