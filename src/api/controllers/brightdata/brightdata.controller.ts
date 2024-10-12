import { bind } from "@decorators/bind.decorator";
import {
  IBrightDataQueryParams,
  IBrightDataResponse,
} from "@interfaces/brightdata.interface";
import { BrightDataStatusEnum } from "@interfaces/model.interface";
import { BrightDataMonitorRepository } from "@repositories/brightdata-monitor.repository";
import { ConfigService } from "@services/config.service";
import { LoggerService } from "@services/logger.service";
import axios from "axios";
import { injectable } from "inversify";

/**
 * BrightDataController is used to get instagram data from brightdata scraper
 */
@bind()
@injectable()
export class BrightDataController {
  private readonly brightDataDatasetIdsMapping = {
    instagram_comments: "gd_ltppn085pokosxh13",
    instagram_posts: "gd_lk5ns7kz21pck8jpis",
    instagram_profiles: "gd_l1vikfch901nx3by4",
    instagram_reels: "gd_lyclm20il4r5helnj",
  };
  private readonly brightDataBaseApiUrl =
    "https://api.brightdata.com/datasets/v3/trigger";
  private brightDataToken: string;
  private host: string;
  private notify_url: string;
  private readonly brightDataQueryParams: IBrightDataQueryParams = {
    dataset_id: "", // need to be set
    endpoint: "", // need to be set
    format: "json",
    include_errors: true,
    limit_multiple_results: 50,
  };

  constructor(
    private readonly brightDataMonitorRepository: BrightDataMonitorRepository,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService
  ) {
    this.brightDataToken = this.configService.get<string>("BRIGHT_DATA_TOKEN");
    this.host = this.configService.get<string>("HOST");
    this.notify_url = `${this.host}brightdata/monitor`;
  }

  // TODO: il faudra mettre un système qui permet de monitor l'avancement du traitement et retourner le status du traitement si l'utilisateur query une deuxième fois la même url
  /**
   * Get instagram comments from any instagram content
   */
  public async getInstagramComments(
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    // TODO: Il faudra ajouter dans la base de données ces résultats et autoriser un chargement des post 1 fois par jour maximum
    return this.prepareAndTriggerBrightData(
      "instagram_comments",
      "instagram/comments/webhook",
      urls
    );
  }

  public async getInstagramPosts(
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    return this.prepareAndTriggerBrightData(
      "instagram_posts",
      "instagram/posts/webhook",
      urls
    );
  }

  public async getInstagramProfiles(
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    return this.prepareAndTriggerBrightData(
      "instagram_profiles",
      "instagram/profiles/webhook",
      urls
    );
  }

  public async getInstagramReels(
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    return this.prepareAndTriggerBrightData(
      "instagram_reels",
      "instagram/reels/webhook",
      urls
    );
  }

  /**
   * Format the urls to be used in the bright data api
   */
  private formatUrls(urls: string[]): { url: string }[] {
    return urls.map((url) => ({ url }));
  }

  /**
   * Get data from bright data
   */
  private async prepareAndTriggerBrightData(
    dataset: keyof typeof this.brightDataDatasetIdsMapping,
    endpoint: string,
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    const formattedUrls = this.formatUrls(urls);
    const brightDataQueryParams: IBrightDataQueryParams = {
      ...this.brightDataQueryParams,
      dataset_id: this.brightDataDatasetIdsMapping[dataset],
      endpoint: `${this.host}${endpoint}`,
      notify: this.notify_url,
    };

    const response = await this.triggerDataCollection(
      brightDataQueryParams,
      formattedUrls
    );

    await this.createBrightDataMonitor(
      brightDataQueryParams.dataset_id,
      response.snapshot_id,
      brightDataQueryParams.endpoint,
      urls
    );

    return response;
  }

  private async createBrightDataMonitor(
    dataset_id: string,
    snapshot_id: string,
    url: string,
    requested_urls: string[]
  ): Promise<void> {
    await this.brightDataMonitorRepository.registerTransaction({
      dataset_id,
      snapshot_id,
      url,
      status: BrightDataStatusEnum.RUNNING,
      requested_urls,
    });
  }

  private async requestLimiter(dataset_id: string, requested_urls: string[]) {
    // S'il y a une transaction en cours, pour les profiles transmi on ne peut pas en register une nouvelle
    // S'il y a des transactions terminées dans les 24 dernières heures, on ne peut pas en register une nouvelle
  }

  /**
   * Trigger the data collection api from bright data
   * We are using the Webhook handle to get the data once the processing is completed
   * For more information about the bright data webhook, please refer to the following link:
   * https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview#via-webhook
   */
  private async triggerDataCollection(
    queryParams: IBrightDataQueryParams,
    formattedUrls: { url: string }[]
  ): Promise<IBrightDataResponse> {
    try {
      const response = await axios<IBrightDataResponse>({
        method: "POST",
        url: this.brightDataBaseApiUrl,
        params: queryParams,
        headers: {
          Authorization: `Bearer ${this.brightDataToken}`,
          "Content-Type": "application/json",
        },
        data: formattedUrls,
      });

      return response.data;
    } catch (error) {
      this.loggerService.pino.error(error);
      throw Error("Error while fetching instagram comments");
    }
  }
}
