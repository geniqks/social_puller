import {
  IInstagramComments,
  IInstagramPosts,
  IInstagramProfile,
  IInstagramReels,
} from "./instagram.interface";
import { BrightDataStatusEnum } from "./model.interface";

export interface IBrightDataWebhookResponse {
  input?: {
    url: string;
  };
  warning?: string;
  warning_code?: string;
}

/**
 * The snapshot_id, is the id of the snapshot to monitor from bright data
 * It will allow us to retrieve the data once the processing is completed
 */
export interface IBrightDataResponse {
  snapshot_id: string;
}

export interface IBrightDataQueryParams {
  dataset_id: string;
  endpoint: string;
  format: string;
  include_errors: boolean;
  limit_multiple_results: number;
  // Endpoint that brightdata will call once the processing is completed
  notify?: string;
}
// https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview#monitor-progress
export interface IBrightDataProgress {
  status: BrightDataStatusEnum;
  snapshot_id: string;
  dataset_id: string;
  records: number;
  errors: number;
  collection_duration: number;
}

export type BrightDataResponse =
  | IInstagramPosts
  | IInstagramComments
  | IInstagramProfile
  | IInstagramReels;
