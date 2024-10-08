import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { BaseDriver } from "./base.driver";
import { InstagramDriver } from "./instagram.drive";

@bind()
@injectable()
export class TwitterDriver extends BaseDriver {
  constructor(private readonly instagramDriver: InstagramDriver) {
    super();
  }

  public test() {
    this.instagramDriver.test();
    console.log("TwitterDriver");
  }
}
