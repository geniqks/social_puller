import { bind } from "@decorators/bind.decorator";
import axios from "axios";
import { injectable } from "inversify";
import { IBrightDataProgress } from "src/interfaces/brightdata.interface";

@bind()
@injectable()
export class BrightDataService {
  // https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview#monitor-progress
  public async monitorSnapshotId(snapshotId: string) {
    const url = `https://api.brightdata.com/datasets/v3/progress/${snapshotId}`;
    const response = await axios.get<IBrightDataProgress>(url);
    return response.data.status;
  }
}
