import "reflect-metadata";

import { IocContainer } from "@containers/inversify.container";
IocContainer.initContainer();

import { BrightDataController } from "@api/controllers/brightdata/brightdata.controller";

const container = IocContainer.container;
beforeEach(() => {
  container.snapshot();
});

afterEach(() => {
  container.restore();
});

test("adds 1 + 2 to equal 3", () => {
  const brightDataController = container.get(BrightDataController);
  expect(brightDataController).toBeDefined();
});
