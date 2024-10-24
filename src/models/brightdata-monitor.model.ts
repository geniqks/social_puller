import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { BrightDataStatusEnum } from "src/interfaces/model.interface";

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

export const BrightDataMonitorModel = getModelForClass(BrightDataMonitorDto);

export interface IBrightDataMonitorInput {
  dataset_id?: string;
  error_message?: string;
  snapshot_id: string;
  status: BrightDataStatusEnum;
  url?: string;
  requested_urls?: string[];
  error_codes?: {
    dead_page?: boolean;
  };
}
