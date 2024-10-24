import "reflect-metadata";

import { IocContainer } from "@containers/inversify.container";
IocContainer.initContainer();

import { BrightDataController } from "@api/controllers/brightdata/brightdata.controller";
import {
  HttpException,
  HttpExceptionOptions,
} from "@api/errors/http-exception.error";
import { IBrightDataMonitorInput } from "@models/brightdata-monitor.model";
import { BrightDataMonitorRepository } from "@repositories/brightdata-monitor.repository";
import { rebindContainerForTests } from "@tests/helpers/container.helper";
import { StatusCodes } from "http-status-codes";

const container = IocContainer.container;

class BrightDataMonitorRepositoryStub extends BrightDataMonitorRepository {
  public async registerTransaction(
    brightDataMonitorInput: IBrightDataMonitorInput
  ): Promise<void> {
    return Promise.resolve();
  }

  public async hasPendingTransactions(
    dataset_id: string,
    requested_urls: string[]
  ): Promise<{ hasPending: boolean; problematicUrl?: string[] }> {
    return { hasPending: false };
  }

  public async hasTransactionsCompletedInLast24Hours(
    requested_urls: string[]
  ): Promise<{ hasCompletedTransactions: boolean; urls?: string[] }> {
    return { hasCompletedTransactions: false };
  }
}

describe("BrightDataController", () => {
  let brightDataController: BrightDataController;
  const urls = [
    "http://instagram/test1",
    "http://instagram/test2",
    "http://instagram/test3",
  ];

  beforeEach(() => {
    container.snapshot();
    rebindContainerForTests(container, [
      {
        provide: BrightDataMonitorRepository,
        useClass: BrightDataMonitorRepositoryStub,
      },
    ]);

    brightDataController = container.get(BrightDataController);
    // TODO: override bdd data collection to return a fake data, so that the test is not dependant of the bdd
    jest
      .spyOn(brightDataController as any, "triggerDataCollection")
      .mockImplementation(() => {
        return {
          snapshot_id: 123,
        };
      });
  });

  afterEach(() => {
    container.restore();
  });

  describe("prepareAndTriggerBrightData", () => {
    it("should throw an error because the url is being processing", async () => {
      const exception: HttpExceptionOptions = {
        message: `A transaction is already in progress for the urls`,
        urls: [urls[0]],
        statusCode: StatusCodes.CONFLICT,
      };

      jest
        .spyOn(brightDataController as any, "requestLimiter")
        .mockRejectedValue(new HttpException(exception));

      await expect(
        brightDataController.prepareAndTriggerBrightData(
          "instagram_comments",
          "instagram/comments/webhook",
          urls
        )
      ).rejects.toThrow(HttpException);

      jest
        .spyOn(brightDataController as any, "requestLimiter")
        .mockRejectedValue(exception);

      await expect(
        brightDataController.prepareAndTriggerBrightData(
          "instagram_comments",
          "instagram/comments/webhook",
          urls
        )
      ).rejects.toEqual(exception);
    });
    it("should throw an error because the url has already been processed in the last 24 hours", async () => {
      const exception: HttpExceptionOptions = {
        message: `Among the submitted URLs, there is one or more that has already been processed within the last 24 hours.`,
        urls: [urls[0]],
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
      };

      jest
        .spyOn(brightDataController as any, "requestLimiter")
        .mockRejectedValue(new HttpException(exception));

      await expect(
        brightDataController.prepareAndTriggerBrightData(
          "instagram_comments",
          "instagram/comments/webhook",
          urls
        )
      ).rejects.toThrow(HttpException);

      jest
        .spyOn(brightDataController as any, "requestLimiter")
        .mockRejectedValue(exception);

      await expect(
        brightDataController.prepareAndTriggerBrightData(
          "instagram_comments",
          "instagram/comments/webhook",
          urls
        )
      ).rejects.toEqual(exception);
    });
  });

  it("should return a snapshot_id", async () => {
    const result = await brightDataController.prepareAndTriggerBrightData(
      "instagram_comments",
      "instagram/comments/webhook",
      urls
    );
    expect(result).toEqual({
      snapshot_id: 123,
    });
  });
});
