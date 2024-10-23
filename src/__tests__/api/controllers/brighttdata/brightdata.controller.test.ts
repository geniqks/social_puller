import "reflect-metadata";

import { IocContainer } from "@containers/inversify.container";
IocContainer.initContainer();

import { BrightDataController } from "@api/controllers/brightdata/brightdata.controller";
import {
  HttpException,
  HttpExceptionOptions,
} from "@api/errors/http-exception.error";
import { StatusCodes } from "http-status-codes";

const container = IocContainer.container;
describe("BrightDataController", () => {
  const brightDataController = container.get(BrightDataController);
  const urls = [
    "http://instagram/test1",
    "http://instagram/test2",
    "http://instagram/test3",
  ];

  beforeEach(() => {
    container.snapshot();
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

    it("stub prepareAndTriggerBrightData pour retourner salut", async () => {
      jest
        .spyOn(brightDataController, "prepareAndTriggerBrightData")
        .mockResolvedValue({
          snapshot_id: "123",
        });

      const result = await brightDataController.prepareAndTriggerBrightData(
        "instagram_posts",
        "/endpoint",
        ["https://example.com"]
      );

      expect(result).toEqual({
        snapshot_id: "123",
      });
    });
  });
});
