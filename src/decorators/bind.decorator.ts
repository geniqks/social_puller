import { CONTAINER, SERVER_TARGET } from "@constants/decorator.constant";
import { Container } from "inversify";

// Default scope is transient
// @link https://github.com/inversify/InversifyJS/blob/master/wiki/scope.md#controlling-the-scope-of-the-dependencies
export function bind(
  scope: "singleton" | "transient" | "request" = "transient"
) {
  return function (target: any) {
    const container: Container = Reflect.getMetadata(CONTAINER, SERVER_TARGET);

    switch (scope) {
      case "singleton":
        container.bind(target).toSelf().inSingletonScope();
        break;
      case "transient":
        container.bind(target).toSelf().inTransientScope();
        break;
      case "request":
        container.bind(target).toSelf().inRequestScope();
        break;
    }

    return target;
  };
}
