import { BrightDataStatusEnum } from '@drivers/brightdata/enums/bright-data-status.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBrightDataMonitorInput } from '../interfaces/brightdata-monitor-input.interface';
import { BrightDataMonitorModel } from '../schemas/brightdata-monitor.schema';

@Injectable()
export class BrightDataMonitorRepository {
  constructor(
    @InjectModel(BrightDataMonitorModel.name)
    private readonly brightDataMonitorModel: Model<BrightDataMonitorModel>,
  ) {}

  /**
   * ! Never call this function without the requestLimiter() from brightdata.service.ts
   * Register a new transaction
   */
  public async registerTransaction(
    brightDataMonitorInput: IBrightDataMonitorInput,
  ): Promise<void> {
    try {
      await this.brightDataMonitorModel.create(brightDataMonitorInput);
    } catch (error) {
      throw new Error(`Error registering transaction: ${error}`);
    }
  }

  /**
   * Get the status of the transaction
   */
  public async getTransaction(
    snapshot_id: string,
    url: string,
  ): Promise<IBrightDataMonitorInput | null> {
    return await this.brightDataMonitorModel.findOne({ snapshot_id, url });
  }

  /**
   * Update the status of the transaction
   */
  public async updateTransactionStatus(
    brightDataMonitorInput: IBrightDataMonitorInput,
  ): Promise<void> {
    const updateFields: {
      status: BrightDataStatusEnum;
      error_message?: string;
    } = {
      status: brightDataMonitorInput.status,
    };

    if (brightDataMonitorInput.error_message) {
      updateFields.error_message = brightDataMonitorInput.error_message;
    }

    await this.brightDataMonitorModel.updateOne(
      {
        snapshot_id: brightDataMonitorInput.snapshot_id,
      },
      {
        $set: updateFields,
      },
    );
  }

  /**
   * Remove a url from the brightdata monitor
   */
  public async removeUrlFromBrightDataMonitor(url: string): Promise<void> {
    const transaction = await this.brightDataMonitorModel.findOne({
      requested_urls: url,
    });

    if (!transaction) {
      return;
    }

    // If the transaction has only one url and this url is the one we want to remove, we delete the transaction
    // Else we remove the url from the transaction
    if (
      transaction.requested_urls?.length === 1 &&
      transaction.requested_urls?.[0] === url
    ) {
      await this.brightDataMonitorModel.deleteOne({ _id: transaction._id });
    } else {
      await this.brightDataMonitorModel.updateOne(
        { _id: transaction._id },
        { $pull: { requested_urls: url } },
      );
    }
  }

  /**
   * Check if there are pending transactions for the given url
   * Will be used to check if we can register a new transaction for the given url
   */
  public async hasPendingTransactions(
    dataset_id: string,
    requested_urls: string[],
  ): Promise<{ hasPending: boolean; problematicUrl?: string[] }> {
    const pendingTransaction = await this.brightDataMonitorModel
      .findOne({
        dataset_id,
        requested_urls: { $in: requested_urls },
        status: { $eq: BrightDataStatusEnum.RUNNING },
      })
      .lean();

    if (!pendingTransaction) {
      return { hasPending: false };
    }

    const problematicUrl = requested_urls.filter((url) =>
      pendingTransaction.requested_urls?.includes(url),
    );

    return { hasPending: true, problematicUrl };
  }

  /**
   * Check if there are transactions completed in the last 24 hours
   * Will be used to check if we can register a new transaction for the given url
   */
  public async hasTransactionsCompletedInLast24Hours(
    requested_urls: string[],
  ): Promise<{
    hasCompletedTransactions: boolean;
    urls?: string[];
  }> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const processedTransactions = await this.brightDataMonitorModel
      .find({
        requested_urls: { $in: requested_urls },
        created_at: { $gte: twentyFourHoursAgo },
        $or: [
          { status: BrightDataStatusEnum.DONE },
          { status: BrightDataStatusEnum.READY },
        ],
      })
      .lean();

    const problematicUrls = processedTransactions.flatMap(
      (transaction) =>
        transaction.requested_urls?.filter((url) =>
          requested_urls.includes(url),
        ) || [],
    );

    return {
      hasCompletedTransactions: problematicUrls.length > 0,
      urls: problematicUrls,
    };
  }
}
