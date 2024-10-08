import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { BaseDriver } from "./base.driver";

@bind()
@injectable()
export class InstagramDriver extends BaseDriver {
  public test() {
    console.log("InstagramDriver");
  }
}
