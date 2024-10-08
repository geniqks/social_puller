import { CONTAINER, SERVER_TARGET } from "@constants/decorator.constant";
import { Container } from "inversify";

export class IocContainer {
  private static _container: Container;

  public static initContainer(): void {
    IocContainer._container = new Container();
    Reflect.defineMetadata(CONTAINER, IocContainer.container, SERVER_TARGET);
  }

  public static get container(): Container {
    return this._container;
  }
}
