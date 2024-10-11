import { getModelForClass, prop } from "@typegoose/typegoose";
import { BrightDataStatus } from "./model.interface";

/**
 * This model will be used to monitor the request to BrightData
 * It will be used to limit the number of request to BrightData
 */
class BrightDataMonitorDto {
  @prop()
  public snapshot_id!: string;

  // https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview#monitor-progress
  @prop()
  public status!: BrightDataStatus;

  @prop({ default: () => new Date() })
  public created_at!: Date;
}

export const BrightDataMonitorModel = getModelForClass(BrightDataMonitorDto);
