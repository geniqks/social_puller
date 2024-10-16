import { CONTAINER, SERVER_TARGET } from "@constants/decorator.constant";
import { Container } from "inversify";
import { IocContainer } from "src/containers/inversify.container";

export function prepareEnvironnement(): Container {
  const container = new Container();
  Reflect.defineMetadata(CONTAINER, IocContainer.container, SERVER_TARGET);
  return container;
}
