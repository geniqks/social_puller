import { Container, interfaces } from "inversify";

// Class constructor type
type Constructor<T = any> = new (...args: any[]) => T;

interface IContainerBind {
  /** The class associating to the token */
  useClass: Constructor;
  /** token of injection */
  provide: interfaces.ServiceIdentifier;
}

/**
 * Rebind container value for tests
 */
export function rebindContainerForTests(
  container: Container,
  binding: IContainerBind[]
) {
  for (const containerBind of binding) {
    const instanciatedClass = new containerBind.useClass();
    // Remove default binding
    container.unbind(containerBind.provide);
    // Bind the stub class
    container.bind(containerBind.provide).toConstantValue(instanciatedClass);
  }
}
