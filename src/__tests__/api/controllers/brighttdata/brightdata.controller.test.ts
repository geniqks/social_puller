import "reflect-metadata";

import { IocContainer } from "@containers/inversify.container";
IocContainer.initContainer();

import { BrightDataController } from "@api/controllers/brightdata/brightdata.controller";
import { HttpException } from "@api/errors/http-exception.error";
import { StatusCodes } from "http-status-codes";
import { it } from "node:test";

const container = IocContainer.container;
describe("BrightDataController", () => {
  const brightDataController = container.get(BrightDataController);
  const urls = ["http://instagram/testurl1", "http://instagram/testurl2"];
  beforeEach(() => {
    container.snapshot();
    jest
      .spyOn(brightDataController as any, "triggerDataCollection")
      .mockResolvedValue({
        snapshot_id: 123,
      });
  });

  afterEach(() => {
    container.restore();
  });

  describe("prepareAndTriggerBrightData", () => {
    it("should throw an error because the url is being processing ", async () => {
      jest
        .spyOn(brightDataController as any, "requestLimiter")
        .mockResolvedValue(
          new HttpException({
            message: `A transaction is already in progress for the urls`,
            urls: [urls[0]],
            statusCode: StatusCodes.CONFLICT,
          })
        );

      expect(
        await brightDataController.prepareAndTriggerBrightData(
          "instagram_comments",
          "instagram/comments/webhook",
          urls
        )
      ).toThrow(
        new HttpException({
          message: `A transaction is already in progress for the urls`,
          urls: [urls[0]],
          statusCode: StatusCodes.CONFLICT,
        })
      );
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
