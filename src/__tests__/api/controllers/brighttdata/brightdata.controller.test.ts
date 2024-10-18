import "reflect-metadata";

import { IocContainer } from "@containers/inversify.container";
IocContainer.initContainer();

import { BrightDataController } from "@api/controllers/brightdata/brightdata.controller";

const container = IocContainer.container;

test("adds 1 + 2 to equal 3", () => {
  const brightDataController = container.get(BrightDataController);
  expect(brightDataController).toBeDefined();
});

// Example of how to sub a class
test("stub prepareAndTriggerBrightData pour retourner salut", async () => {
  const brightDataController = container.get(BrightDataController);

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
