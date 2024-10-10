import { bind } from "@decorators/bind.decorator";
import { ConfigService } from "@services/config.service";
import { LoggerService } from "@services/logger.service";
import axios from "axios";
import { injectable } from "inversify";
import { IInstagramBrightDataResponse } from "./brightdata.interface";

/**
 * BrightDataController is used to get instagram data from brightdata scraper
 */
@bind()
@injectable()
export class BrightDataController {
  private readonly brightDataDatasetIdsMapping = {
    profiles: 'gd_l1vikfch901nx3by4',
    comments: 'gd_ltppn085pokosxh13',
    reels: 'gd_lyclm20il4r5helnj',
  }
  private readonly brightDataBaseApiUrl = 'https://api.brightdata.com/datasets/v3/trigger?dataset_id=';
  private brightDataToken: string;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService
  ) {
    this.brightDataToken = this.configService.get<string>("BRIGHT_DATA_TOKEN");
  }

  /**
   * Get instagram comments from any instagram content
   */
  public async getInstagramComments(urls: string[]): Promise<IInstagramBrightDataResponse | void> {
    // Il faudra ajouter dans la base de données ces résultats et autoriser un chargement des post 1 fois par jour maximum
    const brightDataCommentEndpointId = this.brightDataDatasetIdsMapping.comments;
    const url = `${this.brightDataBaseApiUrl}${brightDataCommentEndpointId}`
    const formattedUrls = this.formatUrls(urls);

    try {
      const response = await axios<IInstagramBrightDataResponse>({
        method: 'POST',
        url,
        headers: {
          'Authorization': `Bearer ${this.brightDataToken}`,
          'Content-Type': 'application/json'
        },
        data: formattedUrls
      })

      return response.data;
    } catch (error) {
      this.loggerService.pino.error(error);
      throw Error("Error while fetching instagram comments");
    }
  }

  private async monitorSnapshots(datasetId: string) {
    const url = 'https://api.brightdata.com/datasets/v3/progress/s_m23rt2048uorzjsuj'

  }

  /**
   * Format the urls to be used in the bright data api
   */
  private formatUrls(urls: string[]): { url: string }[] {
    return urls.map((url) => ({ url }));
  }
}
