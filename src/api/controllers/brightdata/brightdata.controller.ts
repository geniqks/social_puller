import { HttpException } from "@api/errors/http-exception.error";
import { bind } from "@decorators/bind.decorator";
import {
  BrightDataResponse,
  IBrightDataQueryParams,
  IBrightDataResponse,
} from "@interfaces/brightdata.interface";
import { BrightDataStatusEnum } from "@interfaces/model.interface";
import { BrightDataMonitorRepository } from "@repositories/brightdata-monitor.repository";
import { ConfigService } from "@services/config.service";
import { LoggerService } from "@services/logger.service";
import axios from "axios";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
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
    instagram_profile: "gd_l1vikfch901nx3by4",
    instagram_reels: "gd_lyclm20il4r5helnj",
    twitter_profile: "gd_lwxmeb2u1cniijd7t4",
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
    private readonly loggerService: LoggerService,
    readonly configService: ConfigService
  ) {
    this.brightDataToken = configService.get<string>("BRIGHT_DATA_TOKEN");
    this.host = configService.get<string>("HOST");
    this.notify_url = `${this.host}brightdata/monitor`;
  }

  /**
   * Processes the webhook response from Bright Data
   * Removes URLs with warnings from the monitor and filters out responses with warnings
   */
  public async filterAndCleanBrightDataResponses<T extends BrightDataResponse>(
    brightDataResponses: T[]
  ): Promise<T[]> {
    const brightDataResponsesWithWarning = brightDataResponses.filter(
      (item) => item?.warning
    );

    // TODO: voir pour garder en mémoire les urls en erreur et potentiellement autoriser 1 requête pas semaine sur les urls en erreur
    for (const brightDataResponseWithWarning of brightDataResponsesWithWarning) {
      if (brightDataResponseWithWarning.input) {
        await this.brightDataMonitorRepository.removeUrlFromBrightDataMonitor(
          brightDataResponseWithWarning.input.url
        );
      }
    }

    if (brightDataResponsesWithWarning.length) {
      return brightDataResponses.filter((response) => !response.warning);
    }

    return brightDataResponses;
  }

  /**
   * Formats and deduplicates URLs for the Bright Data API
   */
  private formatUrls(urls: string[]): { url: string }[] {
    const uniqueUrls = [...new Set(urls)];
    return uniqueUrls.map((url) => ({ url }));
  }

  /**
   * Get data from bright data
   */
  public async prepareAndTriggerBrightData(
    dataset: keyof typeof this.brightDataDatasetIdsMapping,
    endpoint: string,
    urls: string[]
  ): Promise<IBrightDataResponse | void> {
    const filteredUrls = urls.filter((url) => url);
    if (!filteredUrls.length) {
      throw new HttpException({
        message: ReasonPhrases.BAD_REQUEST,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    const formattedUrls = this.formatUrls(filteredUrls);
    const brightDataQueryParams: IBrightDataQueryParams = {
      ...this.brightDataQueryParams,
      dataset_id: this.brightDataDatasetIdsMapping[dataset],
      endpoint,
      notify: this.notify_url,
    };

    await this.requestLimiter(brightDataQueryParams.dataset_id, urls);

    const response = await this.triggerDataCollection(
      brightDataQueryParams,
      formattedUrls
    );

    await this.brightDataMonitorRepository.registerTransaction({
      dataset_id: brightDataQueryParams.dataset_id,
      snapshot_id: response.snapshot_id,
      url: brightDataQueryParams.endpoint,
      status: BrightDataStatusEnum.RUNNING,
      requested_urls: urls,
    });

    return response;
  }

  /**
   * TODO: Ajouter un check pour vérifier si la requête est en erreur et si l'erreur est dead_page on acceptera jamais de retraiter cette url
   * Check if there is a transaction in progress or if there are transactions completed in the last 24 hours
   */
  private async requestLimiter(
    dataset_id: string,
    requested_urls: string[]
  ): Promise<void> {
    const hasTransactionInProgress =
      await this.brightDataMonitorRepository.hasPendingTransactions(
        dataset_id,
        requested_urls
      );

    const hasTransactionsCompletedInLast24Hours =
      await this.brightDataMonitorRepository.hasTransactionsCompletedInLast24Hours(
        requested_urls
      );

    if (hasTransactionInProgress.hasPending) {
      throw new HttpException({
        message: `A transaction is already in progress for the urls`,
        urls: hasTransactionInProgress.problematicUrl,
        statusCode: StatusCodes.CONFLICT,
      });
    }

    if (hasTransactionsCompletedInLast24Hours.hasCompletedTransactions) {
      throw new HttpException({
        message: `Among the submitted URLs, there is one or more that has already been processed within the last 24 hours.`,
        urls: hasTransactionsCompletedInLast24Hours.urls,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
      });
    }
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
    const updatedQueryParams = {
      ...queryParams,
      endpoint: `${this.host}${queryParams.endpoint}`,
    };

    try {
      const response = await axios<IBrightDataResponse>({
        method: "POST",
        url: this.brightDataBaseApiUrl,
        params: updatedQueryParams,
        headers: {
          Authorization: `Bearer ${this.brightDataToken}`,
          "Content-Type": "application/json",
        },
        data: formattedUrls,
      });

      return response.data;
    } catch (error) {
      this.loggerService.pino.error(error);
      throw Error("Error while fetching data from Brightdata");
    }
  }
}
