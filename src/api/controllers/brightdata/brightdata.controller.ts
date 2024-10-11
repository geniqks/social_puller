import { bind } from "@decorators/bind.decorator";
import { ConfigService } from "@services/config.service";
import { LoggerService } from "@services/logger.service";
import axios from "axios";
import { injectable } from "inversify";
import { IInstagramBrightDataQueryParams, IInstagramBrightDataResponse } from "./brightdata.interface";

/**
 * BrightDataController is used to get instagram data from brightdata scraper
 */
@bind()
@injectable()
export class BrightDataController {
  private readonly brightDataDatasetIdsMapping = {
    comments: 'gd_ltppn085pokosxh13',
    posts: 'gd_lk5ns7kz21pck8jpis',
    profiles: 'gd_l1vikfch901nx3by4',
    reels: 'gd_lyclm20il4r5helnj',
  }
  private readonly brightDataBaseApiUrl = 'https://api.brightdata.com/datasets/v3/trigger';
  private brightDataToken: string;
  private host: string;
  private readonly brightDataQueryParams: IInstagramBrightDataQueryParams = {
    dataset_id: '', // need to be set 
    endpoint: '', // need to be set
    include_errors: true,
    limit_multiple_results: 50,
    format: 'json',
  }

  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService
  ) {
    this.brightDataToken = this.configService.get<string>("BRIGHT_DATA_TOKEN");
    this.host = this.configService.get<string>("HOST");
  }

  // TODO: il faudra mettre un système qui permet de monitor l'avancement du traitement et retourner le status du traitement si l'utilisateur query une deuxième fois la même url
  /**
   * Get instagram comments from any instagram content
   */
  public async getInstagramComments(urls: string[]): Promise<IInstagramBrightDataResponse | void> {
    // TODO: Il faudra ajouter dans la base de données ces résultats et autoriser un chargement des post 1 fois par jour maximum
    const formattedUrls = this.formatUrls(urls);
    const brightDataQueryParams: IInstagramBrightDataQueryParams = {
      ...this.brightDataQueryParams,
      dataset_id: this.brightDataDatasetIdsMapping.comments,
      endpoint: `${this.host}instagram/comments/webhook`,
    }
    const response = await this.triggerDataCollection(brightDataQueryParams, formattedUrls);
    return response;
  }

  public async getInstagramPosts(urls: string[]): Promise<IInstagramBrightDataResponse | void> {
    const formattedUrls = this.formatUrls(urls);
    const response = await this.triggerDataCollection(this.brightDataQueryParams, formattedUrls);
    return response;
  }

  public async getInstagramProfiles(urls: string[]): Promise<IInstagramBrightDataResponse | void> {
    const formattedUrls = this.formatUrls(urls);
    const response = await this.triggerDataCollection(this.brightDataQueryParams, formattedUrls);
    return response;
  }

  public async getInstagramReels(urls: string[]): Promise<IInstagramBrightDataResponse | void> {
    const formattedUrls = this.formatUrls(urls);
    const response = await this.triggerDataCollection(this.brightDataQueryParams, formattedUrls);
    return response;
  }

  /**
   * Format the urls to be used in the bright data api
   */
  private formatUrls(urls: string[]): { url: string }[] {
    return urls.map((url) => ({ url }));
  }

  /**
   * Trigger the data collection api from bright data
   * We are using the Webhook handle to get the data once the processing is completed
   * For more information about the bright data webhook, please refer to the following link:
   * https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview#via-webhook
   */
  private async triggerDataCollection(
    queryParams: IInstagramBrightDataQueryParams,
    formattedUrls: { url: string }[]
  ): Promise<IInstagramBrightDataResponse> {
    try {
      const response = await axios<IInstagramBrightDataResponse>({
        method: 'POST',
        url: this.brightDataBaseApiUrl,
        params: queryParams,
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
}
