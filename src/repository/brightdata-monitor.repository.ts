import { bind } from "@decorators/bind.decorator";
import { BrightDataStatusEnum } from "@interfaces/model.interface";
import {
  IBrightDataMonitorInput,
  BrightDataMonitorModel,
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
    const hasPendingTransactions =
      await this.hasTransactionsCompletedInLast24Hours(
        brightDataMonitorInput.url
      );

    if (hasPendingTransactions) {
      throw new Error(
        `Cannot register transaction, there are pending transactions for url: ${brightDataMonitorInput.url}`
      );
    }

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
    brightDataMonitorInput: IBrightDataMonitorInput
  ): Promise<void> {
    await BrightDataMonitorModel.updateOne(
      {
        snapshot_id: brightDataMonitorInput.snapshot_id,
        url: brightDataMonitorInput.url,
      },
      {
        $set: {
          status: brightDataMonitorInput.status,
        },
      }
    );
  }

  /**
   * Check if there are pending transactions for the given url
   * Will be used to check if we can register a new transaction for the given url
   */
  public async hasPendingTransactions(url: string): Promise<boolean> {
    const pendingTransactions = await BrightDataMonitorModel.findOne({
      url,
    }).lean();

    if (!pendingTransactions) {
      return false;
    }

    return pendingTransactions.status !== BrightDataStatusEnum.READY;
  }

  /**
   * Check if there are transactions completed in the last 24 hours
   * Will be used to check if we can register a new transaction for the given url
   */
  public async hasTransactionsCompletedInLast24Hours(
    url: string
  ): Promise<boolean> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const pendingTransactions = await BrightDataMonitorModel.findOne({
      url,
      createdAt: { $gte: twentyFourHoursAgo },
      status: BrightDataStatusEnum.READY,
    });

    return !!pendingTransactions;
  }
}
// TODO: retirer les commentaires
// S'il y a une transaction en cours, on ne peut pas en register une nouvelle
// S'il y a des transactions terminées dans les 24 dernières heures, on ne peut pas en register une nouvelle
