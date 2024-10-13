import { bind } from "@decorators/bind.decorator";
import { BrightDataStatusEnum } from "@interfaces/model.interface";
import {
  BrightDataMonitorModel,
  IBrightDataMonitorInput,
} from "@models/brightdata-monitor.model";
import { injectable } from "inversify";

@bind()
@injectable()
export class BrightDataMonitorRepository {
  /**
   * Register a new transaction
   */
  public async registerTransaction(
    brightDataMonitorInput: IBrightDataMonitorInput
  ): Promise<void> {
    // TODO: cette vérification 'est pas la bonne il faut vérifier les requested_urls et non l'url
    // const hasPendingTransactions =
    //   await this.hasTransactionsCompletedInLast24Hours(
    //     brightDataMonitorInput.url
    //   );

    // if (hasPendingTransactions) {
    //   throw new Error(
    //     `Cannot register transaction, there are pending transactions for url: ${brightDataMonitorInput.url}`
    //   );
    // }

    try {
      await BrightDataMonitorModel.create(brightDataMonitorInput);
    } catch (error) {
      throw new Error(`Error registering transaction: ${error}`);
    }
  }

  /**
   * Get the status of the transaction
   */
  public async getTransaction(
    snapshot_id: string,
    url: string
  ): Promise<IBrightDataMonitorInput | null> {
    return await BrightDataMonitorModel.findOne({ snapshot_id, url });
  }

  /**
   * Update the status of the transaction
   */
  public async updateTransactionStatus(
    brightDataMonitorInput: Partial<IBrightDataMonitorInput>
  ): Promise<void> {
    await BrightDataMonitorModel.updateOne(
      {
        snapshot_id: brightDataMonitorInput.snapshot_id,
      },
      {
        $set: {
          status: brightDataMonitorInput.status,
          error_message: brightDataMonitorInput?.error_message,
        },
      }
    );
  }

  /**
   * Check if there are pending transactions for the given url
   * Will be used to check if we can register a new transaction for the given url
   */
  public async hasPendingTransactions(
    dataset_id: string,
    requested_urls: string[]
  ): Promise<{ hasPending: boolean; problematicUrl?: string }> {
    const pendingTransaction = await BrightDataMonitorModel.findOne({
      dataset_id,
      requested_urls: { $in: requested_urls },
      status: { $eq: BrightDataStatusEnum.RUNNING },
    }).lean();

    if (!pendingTransaction) {
      return { hasPending: false };
    }

    const problematicUrl = requested_urls.find((url) =>
      pendingTransaction.requested_urls?.includes(url)
    );

    return { hasPending: true, problematicUrl };
  }

  /**
   * Check if there are transactions completed in the last 24 hours
   * Will be used to check if we can register a new transaction for the given url
   */
  public async hasTransactionsCompletedInLast24Hours(
    requested_urls: string[]
  ): Promise<{
    hasCompletedTransactions: boolean;
    urls?: string[];
  }> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const processedTransactions = await BrightDataMonitorModel.find({
      requested_urls: { $in: requested_urls },
      created_at: { $gte: twentyFourHoursAgo },
      status: BrightDataStatusEnum.READY,
    }).lean();

    const problematicUrls = processedTransactions.flatMap(
      (transaction) =>
        transaction.requested_urls?.filter((url) =>
          requested_urls.includes(url)
        ) || []
    );

    return {
      hasCompletedTransactions: problematicUrls.length > 0,
      urls: problematicUrls,
    };
  }
}
