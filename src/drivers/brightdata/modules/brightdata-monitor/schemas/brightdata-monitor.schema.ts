import { BrightDataStatusEnum } from '@drivers/brightdata/enums/bright-data-status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * This model will be used to monitor the request to BrightData
 * It will be used to limit the number of request to BrightData
 */
@Schema()
export class BrightDataMonitorModel {
  @Prop()
  public snapshot_id!: string;

  @Prop()
  public dataset_id!: string;

  @Prop()
  public url!: string;

  @Prop({ type: () => [String] })
  public requested_urls?: string[];

  @Prop()
  public error_message?: string;

  // https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview#monitor-progress
  @Prop()
  public status!: BrightDataStatusEnum;

  @Prop({ default: () => new Date() })
  public created_at!: Date;
}

export const BrightDataMonitorSchema = SchemaFactory.createForClass(
  BrightDataMonitorModel,
);
