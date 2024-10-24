import { BrightDataStatusEnum } from '@drivers/brightdata/enums/bright-data-status.enum';

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
