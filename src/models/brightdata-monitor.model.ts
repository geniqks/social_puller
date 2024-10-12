import { BrightDataStatusEnum } from "@interfaces/model.interface";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

/**
 * This model will be used to monitor the request to BrightData
 * It will be used to limit the number of request to BrightData
 */
@modelOptions({
  options: {
    customName: "brightdata_monitor",
  },
})
class BrightDataMonitorDto {
  @prop()
  public snapshot_id!: string;

  @prop()
  public url!: string;

  // https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview#monitor-progress
  @prop()
  public status!: BrightDataStatusEnum;

  @prop({ default: () => new Date() })
  public created_at!: Date;
}

export const BrightDataMonitorModel = getModelForClass(BrightDataMonitorDto);

export interface IBrightDataMonitorInput {
  snapshot_id: string;
  url: string;
  status: BrightDataStatusEnum;
}
